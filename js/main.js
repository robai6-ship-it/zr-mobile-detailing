(() => {
  const C = window.ZR;
  const B = C.business;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const money = (n) => "$" + n.toLocaleString("en-US");
  const icon = (id) => `<svg><use href="#i-${id}"/></svg>`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Contact links from config ---------- */
  $$("[data-tel]").forEach((a) => (a.href = `tel:+1${B.phone}`));
  $$("[data-sms]").forEach((a) => (a.href = `sms:+1${B.phone}`));
  $$("[data-wa]").forEach((a) => (a.href = `https://wa.me/${B.whatsapp}`));
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
  const fh = $("#footHours"); if (fh) fh.textContent = B.hours;

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const menuBtn = $(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", false); }));

  const dock = $("#dock");
  const book = $("#book");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", scrollY > 10);
    if (dock) {
      const r = book?.getBoundingClientRect();
      const inBook = r && r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.4;
      dock.classList.toggle("is-on", scrollY > innerHeight * 0.6 && !inBook);
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  const observe = (root = document) => $$(".reveal:not(.is-in)", root).forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });

  /* ---------- Showroom card: wipe between exterior and interior ---------- */
  const sr = $("#srCard");
  if (sr) {
    const slides = $$(".sr-slide", sr), caps = $$(".sr-caption > div", sr), tabs = $$(".sr-tabs button", sr), edge = $(".sr-edge", sr);
    const DUR = 6000;
    sr.style.setProperty("--dur", DUR + "ms");
    let cur = 0, timer = null, busy = false, visible = true;
    const show = (n) => {
      if (n === cur || busy) return;
      busy = true;
      const next = slides[n];
      next.classList.add("is-in");
      if (!reduced) { edge.classList.remove("is-run"); void edge.offsetWidth; edge.classList.add("is-run"); }
      caps.forEach((c, i) => c.classList.toggle("is-on", i === n));
      tabs.forEach((t, i) => t.setAttribute("aria-selected", i === n));
      setTimeout(() => {
        slides[cur].classList.remove("is-on");
        next.classList.remove("is-in"); next.classList.add("is-on");
        cur = n; busy = false;
      }, reduced ? 0 : 1150);
      schedule();
    };
    const schedule = () => { clearTimeout(timer); if (!reduced && visible) timer = setTimeout(() => show((cur + 1) % slides.length), DUR); };
    tabs.forEach((t, i) => t.addEventListener("click", () => show(i)));
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; sr.classList.toggle("is-paused", !visible); visible ? schedule() : clearTimeout(timer); }).observe(sr);
    schedule();

    // Gentle tilt + spotlight following the pointer (mouse only)
    if (!reduced && matchMedia("(hover: hover)").matches) {
      sr.addEventListener("pointermove", (e) => {
        const r = sr.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        sr.style.setProperty("--mx", x * 100 + "%"); sr.style.setProperty("--my", y * 100 + "%");
        sr.style.setProperty("--ry", ((x - 0.5) * 4).toFixed(2) + "deg"); sr.style.setProperty("--rx", ((0.5 - y) * 3).toFixed(2) + "deg");
      });
      sr.addEventListener("pointerleave", () => { sr.style.setProperty("--rx", "0deg"); sr.style.setProperty("--ry", "0deg"); });
    }
  }

  /* ---------- Packages ---------- */
  let sizeIdx = 0;
  const seg = $("#sizeSeg");
  const pkgWrap = $("#packages");
  const renderPackages = () => {
    if (!pkgWrap) return;
    pkgWrap.innerHTML = C.packages.map((p) => `
      <article class="pkg reveal is-in ${p.badge ? "featured" : ""}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <div><h3>${p.name}</h3><p class="tagline">${p.tagline}</p></div>
        <div class="price"><small>from</small><b data-price>${p.prices[sizeIdx]}</b></div>
        <span class="dur">${icon("clock")}${p.duration}</span>
        <ul class="checks">${p.features.map((f) => `<li>${icon("check")}<span>${f}</span></li>`).join("")}</ul>
        <a class="btn ${p.badge ? "btn-gold" : "btn-ghost"} btn-block" href="#book" data-pick="${p.id}">Book ${p.name}</a>
      </article>`).join("");
    $$("[data-pick]", pkgWrap).forEach((a) => a.addEventListener("click", () => Booking.pick(a.dataset.pick, sizeIdx)));
  };
  const movePill = () => {
    const btn = $$("button", seg)[sizeIdx]; const pill = $(".pill", seg);
    if (btn && pill) { pill.style.left = btn.offsetLeft + "px"; pill.style.width = btn.offsetWidth + "px"; }
  };
  if (seg) {
    seg.innerHTML = `<span class="pill"></span>` + C.sizes.map((s, i) => `<button type="button" aria-pressed="${i === 0}"><span class="l">${s.label}</span><span class="s">${s.short || s.label}</span></button>`).join("");
    $$("button", seg).forEach((b, i) => b.addEventListener("click", () => {
      sizeIdx = i;
      $$("button", seg).forEach((x, j) => x.setAttribute("aria-pressed", j === i));
      movePill();
      $$("[data-price]", pkgWrap).forEach((el, k) => animateNumber(el, C.packages[k].prices[i]));
    }));
    addEventListener("resize", movePill);
    document.fonts?.ready.then(movePill);
    setTimeout(movePill, 50);
  }
  function animateNumber(el, to) {
    const from = parseInt(el.textContent, 10) || 0;
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now(), d = 450;
    const step = (t) => { const k = ease(clamp((t - t0) / d)); el.textContent = Math.round(from + (to - from) * k); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  renderPackages();

  const prem = $("#premium");
  if (prem) prem.innerHTML = C.premium.map((p) => `
    <div class="prem reveal"><header><h3>${p.name}</h3><span class="from">${p.from}</span></header><p>${p.text}</p><a href="#book" data-pick="${p.id}">Request a quote →</a></div>`).join("");
  $$("[data-pick]", prem).forEach((a) => a.addEventListener("click", () => Booking.pick(a.dataset.pick, sizeIdx)));

  const addons = $("#addons");
  if (addons) addons.innerHTML = C.addons.map((a) => `<div><span>${a.name}</span><b>${a.note ? a.note + " " : ""}${money(a.price)}</b></div>`).join("");

  /* ---------- Reviews ---------- */
  const rl = $("#reviewList");
  if (rl) rl.innerHTML = C.reviews.map((r) => `
    <figure class="review reveal ${r.sample ? "is-sample" : ""}" style="margin:0">
      ${r.sample ? `<span class="sample">Sample: replace before launch</span>` : ""}
      <span class="stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</span>
      <p>“${r.text}”</p>
      <footer><span class="av">${r.name.trim()[0]}</span><span>${r.name}</span><span class="src">via ${r.source}</span></footer>
    </figure>`).join("");
  const lr = $("#leaveReview");
  if (lr && B.googleReviewUrl) { lr.href = B.googleReviewUrl; lr.target = "_blank"; lr.rel = "noopener"; }
  else if (lr) lr.href = B.instagram, lr.target = "_blank";

  /* ---------- Areas ---------- */
  const chips = $("#areaChips");
  if (chips) chips.innerHTML = C.areas.map((a, i) => `<span class="chip ${i === 0 ? "home" : ""}">${a}</span>`).join("");

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  if (lb) {
    const img = $("img", lb);
    $$("[data-full]").forEach((b) => b.addEventListener("click", () => {
      img.src = b.dataset.full; img.alt = $("img", b)?.alt || ""; lb.classList.add("is-open"); $("button", lb).focus();
    }));
    const close = () => lb.classList.remove("is-open");
    lb.addEventListener("click", (e) => { if (e.target !== img) close(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- Booking ---------- */
  const Booking = (() => {
    const root = $("#booker");
    const st = { size: null, service: null, addons: new Set(), date: null, time: null };
    if (!root) return { pick() {} };
    const services = [
      ...C.packages.map((p) => ({ id: p.id, name: p.name, prices: p.prices, duration: p.duration })),
      ...C.premium.map((p) => ({ id: p.id, name: p.name, quote: p.from, duration: "Quoted after inspection" })),
    ];
    const svc = () => services.find((s) => s.id === st.service);

    const opt = (sel, pressed, inner, attrs = "") => `<button type="button" class="opt" aria-pressed="${pressed}" ${attrs}>${inner}</button>`;
    const renderStep1 = () => {
      $("#bkSizes").innerHTML = C.sizes.map((s, i) => opt(0, st.size === i, `<b>${s.label}</b>`, `data-size="${i}"`)).join("");
      $("#bkServices").innerHTML = services.map((s) => opt(0, st.service === s.id,
        `<span><b>${s.name}</b><small>${s.duration}</small></span><span class="amt">${s.prices ? (st.size == null ? "from " + money(s.prices[0]) : money(s.prices[st.size])) : s.quote}</span>`,
        `data-svc="${s.id}"`)).join("");
      $("#bkAddons").innerHTML = C.addons.map((a) => opt(0, st.addons.has(a.id),
        `<b>${a.name}</b><span class="amt">+${money(a.price)}</span>`, `data-addon="${a.id}"`)).join("");
      $$("[data-size]", root).forEach((b) => b.onclick = () => { st.size = +b.dataset.size; update(); });
      $$("[data-svc]", root).forEach((b) => b.onclick = () => { st.service = b.dataset.svc; update(); });
      $$("[data-addon]", root).forEach((b) => b.onclick = () => { const id = b.dataset.addon; st.addons.has(id) ? st.addons.delete(id) : st.addons.add(id); update(); });
    };

    const total = () => {
      const s = svc(); if (!s || st.size == null) return null;
      if (!s.prices) return null;
      return s.prices[st.size] + [...st.addons].reduce((t, id) => t + (C.addons.find((a) => a.id === id)?.price || 0), 0);
    };
    const whenText = () => st.date ? `${st.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}${st.time ? " at " + st.time : ""}` : null;

    const update = () => {
      renderStep1();
      const s = svc();
      $("#sumTitle").textContent = s ? s.name : "Choose a service";
      $("#sumDur").textContent = s ? s.duration : "Duration depends on service";
      $("#sumSize").textContent = st.size != null ? C.sizes[st.size].label : "Vehicle size not chosen";
      $("#sumWhen").textContent = whenText() || "No time picked yet";
      const ad = [...st.addons].map((id) => C.addons.find((a) => a.id === id)?.name);
      $("#sumAddons").textContent = ad.length ? ad.join(", ") : "No add-ons";
      const t = total();
      $("#sumTotal").textContent = t != null ? money(t) : s && !s.prices ? "Quote" : "-";
      $("#bkSummary").textContent = message(true);
    };

    /* Calendar */
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + 75);
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    const slotTime = (label, d) => {
      const [hm, ap] = label.split(" "); let [h, m] = hm.split(":").map(Number);
      if (ap === "PM" && h !== 12) h += 12; if (ap === "AM" && h === 12) h = 0;
      const x = new Date(d); x.setHours(h, m, 0, 0); return x;
    };
    const daySlots = (d) => C.timeSlots.filter((s) => slotTime(s, d) - Date.now() > 2 * 3600e3);
    const renderCal = () => {
      $("#calMonth").textContent = view.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      $("#calPrev").disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
      $("#calNext").disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > maxDate;
      const first = new Date(view), pad = first.getDay();
      const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      let html = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => `<span class="dow">${d}</span>`).join("");
      html += "<span></span>".repeat(pad);
      for (let n = 1; n <= days; n++) {
        const d = new Date(view.getFullYear(), view.getMonth(), n);
        const off = d < today || d > maxDate || C.closedWeekdays.includes(d.getDay()) || !daySlots(d).length;
        const sel = st.date && d.getTime() === st.date.getTime();
        html += `<button type="button" ${off ? "disabled" : ""} aria-pressed="${!!sel}" class="${d.getTime() === today.getTime() ? "today" : ""}" data-d="${d.getTime()}" aria-label="${d.toDateString()}">${n}</button>`;
      }
      $("#cal").innerHTML = html;
      $$("#cal [data-d]").forEach((b) => b.onclick = () => { st.date = new Date(+b.dataset.d); st.time = null; renderCal(); renderSlots(); update(); });
    };
    const renderSlots = () => {
      const box = $("#slots");
      if (!st.date) { box.innerHTML = "<p>Choose a date to see times.</p>"; return; }
      $("#slotDay").textContent = st.date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
      box.innerHTML = daySlots(st.date).map((t) => `<button type="button" aria-pressed="${st.time === t}">${t}</button>`).join("");
      $$("button", box).forEach((b) => b.onclick = () => { st.time = b.textContent; renderSlots(); update(); });
    };
    $("#calPrev").onclick = () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCal(); };
    $("#calNext").onclick = () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCal(); };

    /* Steps */
    let step = 1;
    const go = (n) => {
      step = n;
      $$(".bk-panel", root).forEach((p) => p.classList.toggle("is-on", +p.dataset.step === n));
      $$("#bkSteps span").forEach((s, i) => { s.classList.toggle("is-on", i + 1 === n); s.classList.toggle("is-done", i + 1 < n); });
      if (n === 3) update();
      const top = root.getBoundingClientRect().top;
      if (top < 0) root.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };
    const err = (n, msg) => { $("#err" + n).textContent = msg; return !msg; };
    $$("[data-next]", root).forEach((b) => b.onclick = () => {
      const n = +b.dataset.next;
      if (n === 2 && !err(1, st.size == null ? "Choose your vehicle size." : !st.service ? "Choose a service." : "")) return;
      if (n === 3 && !err(2, !st.date ? "Pick a day." : !st.time ? "Pick a time." : "")) return;
      go(n);
    });
    $$("[data-prev]", root).forEach((b) => b.onclick = () => go(+b.dataset.prev));

    const v = (id) => $("#" + id).value.trim();
    function message(preview) {
      const s = svc(); const t = total();
      const ad = [...st.addons].map((id) => C.addons.find((a) => a.id === id)?.name);
      const lines = [
        `Hi ZR! I'd like to book a detail.`,
        ``,
        `Service: ${s ? s.name : "-"}${st.size != null ? " (" + C.sizes[st.size].label + ")" : ""}`,
        ad.length ? `Add-ons: ${ad.join(", ")}` : null,
        `When: ${whenText() || "-"}`,
        `Estimate: ${t != null ? money(t) + " (starting price)" : s && !s.prices ? "Please quote" : "-"}`,
        ``,
        `Name: ${v("fName") || (preview ? "…" : "")}`,
        `Phone: ${v("fPhone") || (preview ? "…" : "")}`,
        `Address: ${v("fAddr") || (preview ? "…" : "")}`,
        v("fCar") ? `Vehicle: ${v("fCar")}` : null,
        v("fEmail") ? `Email: ${v("fEmail")}` : null,
        v("fNotes") ? `Notes: ${v("fNotes")}` : null,
      ];
      return lines.filter((l) => l !== null).join("\n");
    }
    $$("#bkForm input, #bkForm textarea").forEach((el) => el.addEventListener("input", () => { $("#bkSummary").textContent = message(true); }));

    $$("[data-send]", root).forEach((b) => b.onclick = () => {
      if (!err(3, !v("fName") ? "Add your name." : v("fPhone").replace(/\D/g, "").length < 10 ? "Add a phone number we can text." : !v("fAddr") ? "Add the address where the car will be." : "")) return;
      const body = message(false);
      const enc = encodeURIComponent(body);
      const kind = b.dataset.send;
      let url;
      if (kind === "sms") {
        const ios = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
        url = `sms:+1${B.phone}${ios ? "&" : "?"}body=${enc}`;
      } else if (kind === "wa") url = `https://wa.me/${B.whatsapp}?text=${enc}`;
      else url = `mailto:${B.email}?subject=${encodeURIComponent("Booking request: " + (svc()?.name || "Detail"))}&body=${enc}`;
      if (kind === "wa") window.open(url, "_blank", "noopener"); else location.href = url;
      $("#err3").style.color = "var(--ok)";
      $("#err3").textContent = "Opening your " + (kind === "sms" ? "messages" : kind === "wa" ? "WhatsApp" : "email") + " app. Just press send. ZR will confirm by text.";
      setTimeout(() => ($("#err3").style.color = ""), 8000);
    });

    renderCal(); renderSlots(); update();
    return {
      pick(id, size) {
        st.service = id; if (st.size == null) st.size = size; update(); go(1);
      },
    };
  })();

  observe();
})();
