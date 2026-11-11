import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";

const ENV_PATH = process.env.SUPABASE_ENV || join(process.cwd(), ".env.local");
const ASSETS_DIR = join(process.cwd(), "Bridgelands-Assets");
const PREFIX = "bridgelands";
const TYPES = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", svg: "image/svg+xml" };

function loadEnv(path) {
  if (!existsSync(path)) throw new Error(`Env file not found: ${path}`);
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const [key, ...value] = line.split("=");
        return [key.trim(), value.join("=").trim().replace(/^["']|["']$/g, "")];
      })
  );
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else {
      const ext = entry.toLowerCase().split(".").pop();
      if (TYPES[ext]) out.push({ local: full, remote: relative(ASSETS_DIR, full).split("\\").join("/"), type: TYPES[ext] });
    }
  }
  return out;
}

async function main() {
  const env = loadEnv(ENV_PATH);
  const base = (env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bucket = env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;
  if (!base || !key || !bucket) throw new Error("Missing Supabase URL, key, or bucket in env file");

  const files = walk(ASSETS_DIR);
  const manifest = {};
  let failed = 0;
  for (const file of files) {
    const path = `${PREFIX}/${file.remote}`.split("/").map(encodeURIComponent).join("/");
    const res = await fetch(`${base}/storage/v1/object/${bucket}/${path}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type, "x-upsert": "true" },
      body: readFileSync(file.local),
    });
    if (!res.ok) {
      failed++;
      console.log(`✗ ${file.remote} (${res.status}) ${(await res.text()).slice(0, 160)}`);
      continue;
    }
    manifest[file.remote] = `${base}/storage/v1/object/public/${bucket}/${path}`;
    console.log(`✓ ${file.remote}`);
  }
  writeFileSync(join(process.cwd(), "scripts", "asset-urls.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\n${files.length - failed} uploaded, ${failed} failed`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
