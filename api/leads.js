const HEADERS = [
  "Date",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Home Type",
  "Are You a Broker",
  "Notes",
  "Form Source",
];

const CHOICES = new Set(["Townhome", "Detached", "Either"]);
const SOURCES = new Set(["hero", "register"]);

function env(name, alias) {
  return process.env[name] || process.env[alias] || "";
}

function extractSpreadsheetId(value) {
  const raw = String(value || "").trim();
  const match = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : raw;
}

function clean(value, max) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

async function getAccessToken() {
  const body = new URLSearchParams({
    client_id: env("GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_CLIENT_ID"),
    client_secret: env("GOOGLE_OAUTH_CLIENT_SECRET", "GOOGLE_CLIENT_SECRET"),
    refresh_token: env("GOOGLE_OAUTH_REFRESH_TOKEN", "GOOGLE_REFRESH_TOKEN"),
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) throw new Error("token");
  return data.access_token;
}

async function sheets(token, path, method, payload) {
  const res = await fetch("https://sheets.googleapis.com/v4/" + path, {
    method,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error("sheets");
  return data;
}

async function appendLead(row) {
  const spreadsheetId = extractSpreadsheetId(env("GOOGLE_SHEETS_SPREADSHEET_ID", "GOOGLE_SHEET_ID"));
  const tab = env("GOOGLE_SHEETS_TAB_NAME", "GOOGLE_SHEET_TAB") || "Bridgelands";
  if (!spreadsheetId) throw new Error("sheet");
  const token = await getAccessToken();
  const meta = await sheets(token, "spreadsheets/" + spreadsheetId + "?fields=sheets.properties.title", "GET");
  const titles = (meta.sheets || []).map((sheet) => sheet.properties.title);
  if (!titles.includes(tab)) {
    await sheets(token, "spreadsheets/" + spreadsheetId + ":batchUpdate", "POST", {
      requests: [{ addSheet: { properties: { title: tab } } }],
    });
  }
  const range = encodeURIComponent(tab + "!A1:I1");
  const header = await sheets(token, "spreadsheets/" + spreadsheetId + "/values/" + range, "GET");
  if (!header.values || !header.values.length) {
    await sheets(token, "spreadsheets/" + spreadsheetId + "/values/" + encodeURIComponent(tab + "!A1") + "?valueInputOption=USER_ENTERED", "PUT", {
      values: [HEADERS],
    });
  }
  await sheets(
    token,
    "spreadsheets/" + spreadsheetId + "/values/" + encodeURIComponent(tab + "!A1") + ":append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS",
    "POST",
    { values: [row] }
  );
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (clean(body.company, 40)) return res.status(200).json({ ok: true });

  const lead = {
    first: clean(body.first, 80),
    last: clean(body.last, 80),
    email: clean(body.email, 120),
    phone: clean(body.phone, 30),
    choice: clean(body.choice, 20),
    broker: clean(body.broker, 3),
    notes: clean(body.notes, 500),
    source: clean(body.source, 20),
  };

  if (!lead.first || !lead.last || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.phone.length < 7) {
    return res.status(400).json({ error: "Check the name, email and phone." });
  }
  if (!CHOICES.has(lead.choice) || (lead.broker !== "Yes" && lead.broker !== "No") || !SOURCES.has(lead.source)) {
    return res.status(400).json({ error: "Choose a home type and answer the broker question." });
  }

  const when = new Date().toLocaleString("en-CA", { timeZone: "America/Toronto", hour12: false });
  try {
    await appendLead([when, lead.first, lead.last, lead.email, lead.phone, lead.choice, lead.broker, lead.notes, lead.source]);
  } catch (err) {
    return res.status(502).json({ error: "The registration list could not be updated. Please try again." });
  }
  return res.status(200).json({ ok: true });
};
