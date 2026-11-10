(function () {
  const S = window.SITE;

  function header() {
    return `
      <div class="announce">
        <div class="wrap announce-inner">
          <p><strong>Launching Nov 10, 2026</strong> <span class="announce-extra">· Get pricing & floor plans before public release</span></p>
          <a class="btn btn-coral btn-sm" href="register.html">Book a review</a>
        </div>
      </div>
      <div class="nav">
        <div class="wrap nav-inner">
          <a class="wordmark" href="index.html" aria-label="Bridgelands — Home">BRIDGE<span>LANDS</span></a>
          <button class="menu-btn" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
          <nav class="nav-links" aria-label="Primary">
            <a href="index.html#features">Why Bridgelands</a>
            <a href="index.html#builder">Community</a>
            <a href="index.html#location">Location</a>
            <a href="blog.html">Blog</a>
            <a class="btn btn-outline btn-sm" href="index.html#downloads">Get Pricing & Floor Plans</a>
            <a class="btn btn-coral btn-sm" href="register.html">Register</a>
          </nav>
        </div>
      </div>`;
  }

  function footer() {
    const sisters = S.sisters.map(([name, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${name}</a>`).join("");
    return `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <p class="wordmark" style="color:white;margin-bottom:16px">BRIDGE<span>LANDS</span></p>
            <p>A future master-planned community at Weston Rd & Teston Rd, within North Vaughan's Block 41 planning area bounded by Kirby Rd, Weston Rd, Teston Rd & Pine Valley Dr. Townhomes and detached homes, pricing on request. Launching November 10, 2026.</p>
            <p><strong>Contact</strong><br><a href="${S.phoneHref}">${S.phone}</a><br><a href="mailto:${S.email}">${S.email}</a><br>Weston Rd & Teston Rd<br>North Vaughan, Ontario</p>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><a href="index.html#features">Why Bridgelands</a></li>
              <li><a href="index.html#builder">Community</a></li>
              <li><a href="index.html#location">Location</a></li>
              <li><a href="index.html#downloads">Get Pricing & Floor Plans</a></li>
              <li><a href="register.html">Book VIP Review</a></li>
              <li><a href="blog.html">Guides & Comparisons</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4>Guides</h4>
            <ul>
              <li><a href="article.html?slug=bridgelands-is-block-41">Block 41 Vaughan</a></li>
              <li><a href="article.html?slug=opa-50-timeline">Block 41 Secondary Plan</a></li>
              <li><a href="article.html?slug=buying-preconstruction">Bridgelands Price List</a></li>
              <li><a href="article.html?slug=opus-townhomes">Bridgelands Floor Plans</a></li>
              <li><a href="article.html?slug=towns-vs-detached">Bridgelands Townhomes</a></li>
              <li><a href="article.html?slug=opus-detached">Bridgelands Detached Homes</a></li>
              <li><a href="article.html?slug=getting-around">Weston Rd & Teston Rd Location</a></li>
              <li><a href="article.html?slug=november-10-launch">November 10 Launch Guide</a></li>
            </ul>
          </div>
        </div>
        <div class="sisters">
          <h4>Related communities</h4>
          <div class="sister-grid">${sisters}</div>
        </div>
        <div class="fine">
          <p>© 2026 Bridgelands Early Access — Marketing by Condo Circle. This independent recreation is not an official builder website and does not represent Arista Homes, DECO Homes or Opus Homes.</p>
          <p>Renderings are artist's concepts. Pricing, product types, incentives and release dates are confirmed by each builder. Information is subject to change. E. & O.E.</p>
        </div>
      </div>
      <div class="floaters">
        <a class="floater" href="${S.whatsapp}" target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat">${waIcon()}</a>
      </div>`;
  }

  function waIcon() {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l6-1.6A11 11 0 0 0 20.5 3.5zM12 20.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.5.9.9-3.4-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.3a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 4 14 14 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.1-.4-.2z"/></svg>`;
  }

  function mountChrome() {
    const h = document.getElementById("chrome-header");
    const f = document.getElementById("chrome-footer");
    if (h) {
      h.className = "site-header";
      h.innerHTML = header();
      const btn = h.querySelector(".menu-btn");
      const links = h.querySelector(".nav-links");
      btn.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    if (f) {
      f.className = "site-footer";
      f.innerHTML = footer();
    }
  }

  function countdown() {
    const el = document.getElementById("countdown");
    if (!el) return;
    const target = new Date("2026-11-10T23:59:59-05:00").getTime();
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        el.textContent = "Today";
        return;
      }
      const h = Math.floor(diff / 36e5);
      const m = Math.floor((diff % 36e5) / 6e4);
      el.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
    }
    tick();
    setInterval(tick, 30000);
  }

  function hero() {
    const slides = [...document.querySelectorAll(".slide")];
    const dots = [...document.querySelectorAll(".hero-dots button")];
    if (!slides.length) return;
    let i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
      dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
    }
    dots.forEach((d, idx) => d.addEventListener("click", () => show(idx)));
    setInterval(() => show(i + 1), 6500);
  }

  function collections() {
    const root = document.getElementById("collection-cards");
    if (!root) return;
    const tabs = document.getElementById("builder-tabs");
    function render(key) {
      const items = S.collections[key];
      root.innerHTML = items.map((item, idx) => `
        <article class="card">
          <img src="${item.img}" alt="${item.title}">
          <div class="card-body">
            <div class="meta">${label(key)} · ${item.kind}</div>
            <h3>${item.title}</h3>
            <div class="size">${item.size}</div>
            <div>${item.meta}</div>
            <div class="card-actions">
              ${item.models ? `<button class="btn btn-outline btn-sm" data-models="${idx}">See all models</button>` : ""}
              <a class="btn btn-coral btn-sm" href="register.html">Unlock floor plans</a>
            </div>
            ${item.models ? `<ul class="models" id="models-${idx}">${item.models.map(m => `<li><span>${m[0]}</span><span>${m[1]}</span><span>${m[2]}</span></li>`).join("")}</ul>` : `<p class="note">Full model list is in the builder brochure. Register to unlock it.</p>`}
          </div>
        </article>`).join("");
      root.querySelectorAll("[data-models]").forEach(btn => {
        btn.addEventListener("click", () => {
          document.getElementById("models-" + btn.dataset.models).classList.toggle("open");
        });
      });
    }
    function label(key) {
      return { opus: "Opus Homes", arista: "Arista Homes", deco: "DECO Homes" }[key];
    }
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      tabs.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.builder);
    });
    render("opus");
  }

  function gallery() {
    const root = document.getElementById("gallery-grid");
    if (!root) return;
    const filters = document.getElementById("gallery-filters");
    function render(filter) {
      const items = S.gallery.filter(g => filter === "all" || g.builder === filter);
      root.innerHTML = items.map(g => `
        <figure data-src="${g.src}">
          <img src="${g.src}" alt="${g.cap}">
          <figcaption>${g.cap}</figcaption>
        </figure>`).join("");
    }
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filters.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
    root.addEventListener("click", (e) => {
      const fig = e.target.closest("figure");
      if (!fig) return;
      const box = document.getElementById("lightbox");
      box.querySelector("img").src = fig.dataset.src;
      box.classList.add("open");
    });
    render("all");
  }

  function brochures() {
    const root = document.getElementById("brochure-grid");
    if (!root) return;
    root.innerHTML = S.brochures.map(([name, meta]) => `<a class="brochure" href="register.html">${name}<small>${meta}</small></a>`).join("");
  }

  function faqs() {
    const root = document.getElementById("faq-list");
    if (!root) return;
    root.innerHTML = S.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
  }

  function posts(limit) {
    const root = document.getElementById("post-grid");
    if (!root) return;
    const list = limit ? S.articles.slice(0, limit) : S.articles;
    root.innerHTML = list.map(a => `
      <a class="post" href="article.html?slug=${a.slug}">
        <div class="cat">${a.cat}</div>
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <div class="when">${a.date} · ${a.read}</div>
      </a>`).join("");
  }

  function articleIndex() {
    const root = document.getElementById("article-index");
    if (!root) return;
    root.innerHTML = S.articles.map(a => `<a href="article.html?slug=${a.slug}">${a.title}</a>`).join("");
  }

  function articlePage() {
    const root = document.getElementById("article");
    if (!root) return;
    const slug = new URLSearchParams(location.search).get("slug");
    const article = S.articles.find(a => a.slug === slug) || S.articles[0];
    document.title = article.title + " — Bridgelands";
    root.innerHTML = `
      <p class="eyebrow">${article.cat}</p>
      <h1>${article.title}</h1>
      <p class="lede">${article.date} · ${article.read}</p>
      ${article.body.map(p => `<p>${p}</p>`).join("")}
      <p><a class="btn btn-coral" href="register.html">Register for early access</a></p>
      <p><a href="blog.html">← All articles</a></p>`;
  }

  function form(rootId) {
    const root = document.getElementById(rootId);
    if (!root) return;
    let step = 1;
    let choice = "";
    function paint() {
      if (step === 1) {
        root.innerHTML = `
          <div class="steps"><span class="active">1 · Home type</span><span>2 · Your details</span><span>3 · Done</span></div>
          <h3>Which home type interests you?</h3>
          <p>Takes 20 seconds. No obligation.</p>
          <div class="choices">
            ${[["Townhome", "Pricing on request — 3-storey freehold towns"], ["Detached", "Larger lots in North Vaughan"], ["Either", "Show me all options as they release"]].map(([t, d]) => `
              <button class="choice ${choice === t ? "active" : ""}" data-choice="${t}"><strong>${t}</strong><span>${d}</span></button>`).join("")}
          </div>`;
        root.querySelectorAll("[data-choice]").forEach(btn => btn.addEventListener("click", () => {
          choice = btn.dataset.choice;
          step = 2;
          paint();
        }));
      } else if (step === 2) {
        root.innerHTML = `
          <div class="steps"><span>1 · ${choice}</span><span class="active">2 · Your details</span><span>3 · Done</span></div>
          <form class="form" id="vip-form">
            <label>First name<input name="first" required placeholder="First name"></label>
            <label>Last name<input name="last" required placeholder="Last name"></label>
            <label>Email<input name="email" type="email" required placeholder="Email"></label>
            <label>Phone<input name="phone" required placeholder="Phone number"></label>
            <label class="full">Notes<textarea name="notes" rows="3" placeholder="Lot size, beds, timeline"></textarea></label>
            <div class="full" style="display:flex;gap:8px">
              <button type="button" class="btn btn-outline" id="back">Back</button>
              <button class="btn btn-coral" type="submit">Unlock floor plans</button>
            </div>
          </form>
          <p class="note">Saved only in this browser. This preview does not send your details to a sales team.</p>`;
        root.querySelector("#back").addEventListener("click", () => { step = 1; paint(); });
        root.querySelector("#vip-form").addEventListener("submit", (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.target).entries());
          data.choice = choice;
          data.at = new Date().toISOString();
          const all = JSON.parse(localStorage.getItem("bridgelands-vip") || "[]");
          all.push(data);
          localStorage.setItem("bridgelands-vip", JSON.stringify(all));
          step = 3;
          paint();
        });
      } else {
        root.innerHTML = `
          <div class="success">
            <p class="eyebrow">You're on the list</p>
            <h3>Thanks — we saved your ${choice.toLowerCase()} interest.</h3>
            <p>On the live registration site, this is where floor plans and pricing updates would be emailed. This preview keeps your entry on this device only.</p>
            <a class="btn btn-coral" href="blog.html">Read the buyer guides</a>
          </div>`;
      }
    }
    paint();
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountChrome();
    countdown();
    hero();
    collections();
    gallery();
    brochures();
    faqs();
    const postMode = document.body.dataset.posts;
    if (postMode === "all") posts(0);
    else if (document.getElementById("post-grid")) posts(Number(postMode) || 4);
    articleIndex();
    articlePage();
    form("register-card");
    form("register-page");
    const box = document.getElementById("lightbox");
    if (box) box.querySelector("button").addEventListener("click", () => box.classList.remove("open"));
  });
})();
