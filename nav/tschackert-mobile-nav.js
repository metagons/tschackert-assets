(function () {
  if (typeof window === "undefined") return;
  if (window.__tschackertHeaderInit) return;
  window.__tschackertHeaderInit = true;

  var HEADER_ID = "tschackert-header";
  var BTN_ID = "tschackert-hamburger";
  var DRAWER_ID = "tschackert-drawer";
  var BACKDROP_ID = "tschackert-backdrop";
  var STYLE_ID = "tschackert-header-style";
  var Z = 2147483647;
  var MOBILE_BP = 860;

  var LOGO_URL = "https://framerusercontent.com/images/13Uiui9ACqyo6DnuT4zwgz38QdU.png?width=1176&height=281";

  var NAV = [
    { label: "Startseite", href: "/" },
    { label: "Über Uns", href: "/ueber-uns" },
    { label: "Leistungen", href: "/leistungen" },
    { label: "Patientenstimmen", href: "/patientenstimmen" }
  ];
  var CTA = { label: "Kostenlose Beratung", href: "/kontakt" };

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = [
      // ── HIDE Framer's built-in Headers ──
      // Target any nav element that contains a Nav Links Wrapper (= Framer's Header).
      "nav:has([data-framer-name='Nav Links Wrapper']){display:none!important}",
      // Also hide the wrapper container around it (covers all responsive variants).
      // Framer renders ssr-variant wrappers; nuke their nav contents on every breakpoint.
      ".ssr-variant > div > nav:has([data-framer-name='Menu']){display:none!important}",
      // Belt-and-braces: hide any element with data-framer-name='Header' just in case.
      "[data-framer-name='Header']{display:none!important}",

      // ── PUSH PAGE CONTENT BELOW OUR FIXED HEADER ──
      // body padding-top equal to header height so content (hero, eyebrows) doesn't
      // sit behind the fixed nav. Tracks the same heights as #tschackert-header below.
      "body{padding-top:72px!important}",
      "@media (max-width:" + MOBILE_BP + "px){body{padding-top:64px!important}}",
      // Anchor jumps account for sticky nav.
      "html{scroll-padding-top:80px}",

      // ── HIDE NAV + FABS WHEN ANY MODAL/DRAWER IS OPEN ──
      // Detected via body overflow:hidden (universal modal-open pattern set by
      // ServicesAssessmentGrid drawer, our menu drawer, and parking modal).
      // Our own drawers always have role=dialog in the DOM (translated off-screen
      // when closed), so :has() would hide the nav permanently — body inline style
      // is the only reliable signal of an actually-open modal.
      "body[style*='overflow: hidden'] #" + HEADER_ID + ",",
      "body[style*='overflow:hidden'] #" + HEADER_ID + ",",
      "body[style*='overflow: hidden'] #tschackert-fab-wrap,",
      "body[style*='overflow:hidden'] #tschackert-fab-wrap{",
        "opacity:0!important;pointer-events:none!important;",
        "transition:opacity 200ms ease;",
      "}",

      // ── MOBILE TAP-TARGET ENFORCEMENT (WCAG AAA = 44×44) ──
      // Target our known button classes from code components. Excludes nav/FAB which
      // are already sized correctly. Adds min-height + padding on mobile only.
      "@media (max-width:640px){",
        ".cta-button,.lh-primary,.ffs-button,.de-button,.bcc-button,.bfh-submit,.tr-secondary-btn,.sag-secondary-btn,.pf-arrow{",
          "min-height:44px!important;",
          "padding-top:12px!important;padding-bottom:12px!important;",
        "}",
        // Framer's PrimaryButton instances (rendered via Framer canvas) — outer container has -container class
        "div[class*='-container'] > a[href]{min-height:44px;display:inline-flex;align-items:center}",
        // Touch tap area boost for tiny icon links (eyebrow text-links etc still OK)
        "a.framer-text{min-height:auto}",
      "}",

      // ── OUR HEADER ──
      "#" + HEADER_ID + "{",
        "position:fixed;top:0;left:0;right:0;z-index:" + Z + ";",
        "display:flex;align-items:center;justify-content:space-between;",
        "padding:14px 60px;box-sizing:border-box;min-height:72px;",
        "background:rgba(255,255,255,0.32);",
        "-webkit-backdrop-filter:blur(14px) saturate(120%);",
        "backdrop-filter:blur(14px) saturate(120%);",
        "border-bottom:1px solid rgba(20,44,47,0.06);",
        "font-family:'Inter',system-ui,sans-serif;",
      "}",
      "@media (max-width:1100px){#" + HEADER_ID + "{padding:12px 32px}}",
      "@media (max-width:" + MOBILE_BP + "px){#" + HEADER_ID + "{padding:12px 18px;min-height:64px}}",

      // Logo
      "#" + HEADER_ID + " .th-logo{display:block;height:44px;flex:0 0 auto}",
      "#" + HEADER_ID + " .th-logo img{height:100%;width:auto;display:block;object-fit:contain}",
      "@media (max-width:" + MOBILE_BP + "px){#" + HEADER_ID + " .th-logo{height:36px}}",

      // Center nav (desktop only)
      "#" + HEADER_ID + " .th-links{",
        "display:flex;gap:32px;align-items:center;",
      "}",
      "#" + HEADER_ID + " .th-links a{",
        "font-size:14px;font-weight:500;color:rgb(20,44,47);",
        "text-decoration:none;letter-spacing:-0.005em;",
        "transition:color 160ms ease;",
      "}",
      "#" + HEADER_ID + " .th-links a:hover{color:rgba(20,44,47,0.65)}",
      "@media (max-width:" + MOBILE_BP + "px){#" + HEADER_ID + " .th-links{display:none}}",

      // Primary CTA (desktop only)
      "#" + HEADER_ID + " .th-cta{",
        "display:inline-flex;align-items:center;",
        "background:rgb(20,44,47);color:rgb(240,238,233);",
        "padding:10px 20px;border-radius:8px;border:0;",
        "font-size:14px;font-weight:500;letter-spacing:-0.005em;",
        "text-decoration:none;cursor:pointer;",
        "transition:background 160ms ease;",
      "}",
      "#" + HEADER_ID + " .th-cta:hover{background:rgb(8,22,24)}",
      "@media (max-width:" + MOBILE_BP + "px){#" + HEADER_ID + " .th-cta{display:none}}",

      // Hamburger (mobile only)
      "#" + BTN_ID + "{display:none}",
      "@media (max-width:" + MOBILE_BP + "px){",
        "#" + BTN_ID + "{",
          "display:flex;width:44px;height:44px;border-radius:8px;",
          "background:rgba(255,255,255,0.92);border:1px solid rgba(20,44,47,0.1);",
          "cursor:pointer;align-items:center;justify-content:center;",
          "padding:0;flex:0 0 auto;color:rgb(20,44,47);",
        "}",
      "}",
      "#" + BTN_ID + " svg{width:20px;height:20px}",

      // Drawer + backdrop
      "#" + BACKDROP_ID + "{",
        "position:fixed;top:0;right:0;bottom:0;left:0;z-index:" + (Z - 2) + ";",
        "background:rgba(20,44,47,0.4);",
        "-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);",
        "opacity:0;pointer-events:none;transition:opacity 220ms ease;",
      "}",
      "#" + BACKDROP_ID + ".is-open{opacity:1;pointer-events:auto}",
      "#" + DRAWER_ID + "{",
        "position:fixed;top:0;right:0;bottom:0;width:88%;max-width:340px;",
        "z-index:" + (Z - 1) + ";background:rgb(255,255,255);",
        "transform:translateX(100%);transition:transform 280ms cubic-bezier(.16,1,.3,1);",
        "box-shadow:-20px 0 40px rgba(20,44,47,0.1);",
        "padding:80px 32px 32px;display:flex;flex-direction:column;",
        "box-sizing:border-box;",
      "}",
      "#" + DRAWER_ID + ".is-open{transform:translateX(0)}",
      "#" + DRAWER_ID + " a{",
        "font-family:'Geist','Inter',system-ui,sans-serif;font-weight:500;",
        "font-size:18px;color:rgb(20,44,47);text-decoration:none;",
        "padding:16px 0;border-bottom:1px solid rgba(20,44,47,0.08);",
        "transition:color 160ms ease;letter-spacing:-0.01em;",
      "}",
      "#" + DRAWER_ID + " a:hover{color:rgba(20,44,47,0.7)}",
      "#" + DRAWER_ID + " a.primary{",
        "margin-top:24px;background:rgb(20,44,47);color:rgb(240,238,233);",
        "padding:18px 24px;border-radius:8px;text-align:center;border:none;",
        "font-weight:600;font-size:16px;",
      "}",
      "#" + DRAWER_ID + " a.primary:hover{background:rgb(8,22,24);color:rgb(240,238,233)}",
      "#" + DRAWER_ID + " .close{",
        "position:absolute;top:18px;right:18px;width:44px;height:44px;",
        "border-radius:8px;background:rgba(20,44,47,0.06);border:0;",
        "cursor:pointer;display:flex;align-items:center;justify-content:center;",
        "padding:0;color:rgb(20,44,47);",
      "}",
      "#" + DRAWER_ID + " .close svg{width:18px;height:18px}",
    ].join("");
    document.head.appendChild(s);
  }

  var header, btn, drawer, backdrop;

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function build() {
    if (document.getElementById(HEADER_ID)) return;

    header = document.createElement("nav");
    header.id = HEADER_ID;
    header.setAttribute("aria-label", "Hauptnavigation");

    var logoLink = document.createElement("a");
    logoLink.href = "/";
    logoLink.className = "th-logo";
    logoLink.setAttribute("aria-label", "Dr. Tschackert");
    var logoImg = document.createElement("img");
    logoImg.src = LOGO_URL;
    logoImg.alt = "Dr. Tschackert";
    logoLink.appendChild(logoImg);
    header.appendChild(logoLink);

    var links = document.createElement("div");
    links.className = "th-links";
    NAV.forEach(function (n) {
      var a = document.createElement("a");
      a.href = n.href;
      a.textContent = n.label;
      links.appendChild(a);
    });
    header.appendChild(links);

    var cta = document.createElement("a");
    cta.className = "th-cta";
    cta.href = CTA.href;
    cta.textContent = CTA.label;
    header.appendChild(cta);

    btn = document.createElement("button");
    btn.id = BTN_ID;
    btn.setAttribute("aria-label", "Menü öffnen");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    btn.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) closeDrawer(); else openDrawer();
    });
    header.appendChild(btn);

    backdrop = document.createElement("div");
    backdrop.id = BACKDROP_ID;
    backdrop.addEventListener("click", closeDrawer);

    drawer = document.createElement("div");
    drawer.id = DRAWER_ID;
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");

    var closeBtn = document.createElement("button");
    closeBtn.className = "close";
    closeBtn.setAttribute("aria-label", "Menü schließen");
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    closeBtn.addEventListener("click", closeDrawer);
    drawer.appendChild(closeBtn);

    NAV.forEach(function (n) {
      var a = document.createElement("a");
      a.href = n.href;
      a.textContent = n.label;
      a.addEventListener("click", closeDrawer);
      drawer.appendChild(a);
    });
    var drawerCta = document.createElement("a");
    drawerCta.href = CTA.href;
    drawerCta.textContent = CTA.label;
    drawerCta.className = "primary";
    drawerCta.addEventListener("click", closeDrawer);
    drawer.appendChild(drawerCta);

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    document.body.appendChild(header);
  }

  // ============================================================================
  // Floating Action Buttons (Phone + Parkhäuser)
  // ============================================================================
  var FAB_WRAP_ID = "tschackert-fab-wrap";
  var FAB_MODAL_ID = "tschackert-fab-modal";
  var FAB_MODAL_BACKDROP_ID = "tschackert-fab-modal-backdrop";

  var PRAXIS_ADDR = "Goethestraße 23, 60313 Frankfurt am Main";
  var PRAXIS_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=Goethestra%C3%9Fe+23+60313+Frankfurt";
  var PHONE_TEL = "+4969283030";

  var PARKHAEUSER = [
    { name: "Parkhaus Goetheplatz", address: "Goetheplatz 2A", walkingTime: "1 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Parkhaus+Goetheplatz+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Tiefgarage Junghofstraße", address: "Junghofstraße", walkingTime: "2 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Tiefgarage+Junghofstra%C3%9Fe+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Parkhaus Börse", address: "Börsenstraße", walkingTime: "3 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Parkhaus+B%C3%B6rse+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Parkhaus Alte Oper", address: "Opernplatz", walkingTime: "4 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Parkhaus+Alte+Oper+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Q-Park Opernplatz", address: "Opernplatz", walkingTime: "4 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Q-Park+Opernplatz+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Hauptwache Car Park", address: "Kornmarkt 10", walkingTime: "5 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Hauptwache+Car+Park+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
  ];

  function ensureFabStyle() {
    if (document.getElementById("tschackert-fab-style")) return;
    var s = document.createElement("style");
    s.id = "tschackert-fab-style";
    s.textContent = [
      "#" + FAB_WRAP_ID + "{",
        "position:fixed;",
        "right:calc(env(safe-area-inset-right,0px) + 16px);",
        "bottom:calc(env(safe-area-inset-bottom,0px) + 20px);",
        "z-index:" + (Z - 5) + ";",
        "display:flex;flex-direction:column;gap:12px;",
        "width:56px;align-items:flex-end;",
        "transform:translateZ(0);will-change:transform,opacity;",
        "transition:transform 320ms ease, opacity 280ms ease;",
        "pointer-events:none;",
      "}",
      "#" + FAB_WRAP_ID + ".is-hidden{transform:translate3d(0,140%,0);opacity:0}",
      "#" + FAB_WRAP_ID + " a, #" + FAB_WRAP_ID + " button{",
        "width:56px;height:56px;border-radius:50%;",
        "flex-shrink:0;flex-grow:0;pointer-events:auto;box-sizing:border-box;",
        "background:rgb(20,44,47);color:rgb(240,238,233);",
        "border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;",
        "box-shadow:0 8px 24px rgba(20,44,47,0.25);text-decoration:none;",
        "transition:transform 200ms ease, background 200ms ease;padding:0;",
      "}",
      "#" + FAB_WRAP_ID + " a:hover, #" + FAB_WRAP_ID + " button:hover{",
        "background:rgb(8,22,24);transform:translateY(-2px);",
      "}",
      "#" + FAB_WRAP_ID + " svg{width:22px;height:22px}",
      "@media (max-width:" + MOBILE_BP + "px){",
        "#" + FAB_WRAP_ID + "{",
          "width:52px;",
          "right:calc(env(safe-area-inset-right,0px) + 14px);",
          "bottom:calc(env(safe-area-inset-bottom,0px) + 18px);",
          "gap:10px;",
        "}",
        "#" + FAB_WRAP_ID + " a, #" + FAB_WRAP_ID + " button{width:52px;height:52px}",
        "#" + FAB_WRAP_ID + " svg{width:20px;height:20px}",
      "}",

      // Modal
      "#" + FAB_MODAL_BACKDROP_ID + "{",
        "position:fixed;inset:0;z-index:" + (Z - 4) + ";",
        "background:rgba(20,44,47,0.5);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);",
        "opacity:0;pointer-events:none;transition:opacity 220ms ease;",
        "display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;",
      "}",
      "#" + FAB_MODAL_BACKDROP_ID + ".is-open{opacity:1;pointer-events:auto}",
      "#" + FAB_MODAL_ID + "{",
        "background:rgb(255,255,255);border-radius:20px;",
        "max-width:680px;width:100%;max-height:88vh;overflow-y:auto;",
        "padding:36px;box-sizing:border-box;position:relative;",
        "transform:translateY(20px);transition:transform 280ms cubic-bezier(.16,1,.3,1);",
        "box-shadow:0 30px 80px rgba(20,44,47,0.25);",
      "}",
      "#" + FAB_MODAL_BACKDROP_ID + ".is-open #" + FAB_MODAL_ID + "{transform:translateY(0)}",
      "#" + FAB_MODAL_ID + " .fabm-eyebrow{",
        "font-family:'Inter',system-ui,sans-serif;font-size:11px;font-weight:600;",
        "letter-spacing:0.18em;text-transform:uppercase;color:rgb(74,106,110);margin:0 0 12px;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-title{",
        "margin:0 0 8px;font-family:'Geist','Inter',system-ui,sans-serif;font-weight:500;",
        "font-size:28px;letter-spacing:-0.025em;line-height:1.15;color:rgb(20,44,47);",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-body{",
        "margin:0 0 28px;font-family:'Inter',system-ui,sans-serif;font-size:14px;",
        "line-height:1.55;color:rgb(107,99,89);",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-praxis{",
        "display:flex;align-items:center;gap:14px;padding:16px 18px;",
        "background:rgb(20,44,47);color:rgb(240,238,233);border-radius:12px;",
        "text-decoration:none;margin-bottom:24px;transition:background 200ms ease;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-praxis:hover{background:rgb(8,22,24)}",
      "#" + FAB_MODAL_ID + " .fabm-praxis svg{width:20px;height:20px;flex:0 0 auto}",
      "#" + FAB_MODAL_ID + " .fabm-praxis .fabm-praxis-text{",
        "font-family:'Inter',system-ui,sans-serif;font-size:15px;font-weight:500;",
        "letter-spacing:-0.005em;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-sectionlabel{",
        "font-family:'Inter',system-ui,sans-serif;font-size:11px;font-weight:600;",
        "letter-spacing:0.18em;text-transform:uppercase;color:rgb(74,106,110);",
        "margin:0 0 14px;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-grid{",
        "display:grid;grid-template-columns:repeat(2,1fr);gap:10px;",
      "}",
      "@media (max-width:640px){#" + FAB_MODAL_ID + " .fabm-grid{grid-template-columns:1fr}}",
      "@media (max-width:640px){#" + FAB_MODAL_ID + "{padding:28px 22px}}",
      "@media (max-width:640px){#" + FAB_MODAL_ID + " .fabm-title{font-size:22px}}",
      "#" + FAB_MODAL_ID + " .fabm-card{",
        "display:flex;flex-direction:column;gap:8px;padding:16px 18px;",
        "background:rgb(250,249,247);border:1px solid rgba(20,44,47,0.08);",
        "border-radius:12px;text-decoration:none;color:inherit;",
        "transition:transform 200ms ease, background 200ms ease;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-card:hover{background:rgb(244,240,233);transform:translateY(-2px)}",
      "#" + FAB_MODAL_ID + " .fabm-card-name{",
        "font-family:'Geist','Inter',system-ui,sans-serif;font-size:15px;font-weight:500;",
        "letter-spacing:-0.015em;color:rgb(20,44,47);line-height:1.3;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-card-addr{",
        "font-family:'Inter',system-ui,sans-serif;font-size:13px;",
        "color:rgb(107,99,89);line-height:1.4;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-card-time{",
        "font-family:'Inter',system-ui,sans-serif;font-size:12px;font-weight:500;",
        "color:rgb(20,44,47);background:rgba(20,44,47,0.06);",
        "padding:4px 10px;border-radius:999px;width:fit-content;letter-spacing:-0.005em;",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-close{",
        "position:absolute;top:18px;right:18px;width:40px;height:40px;",
        "border-radius:8px;background:rgba(20,44,47,0.06);border:0;",
        "cursor:pointer;display:flex;align-items:center;justify-content:center;",
        "padding:0;color:rgb(20,44,47);",
      "}",
      "#" + FAB_MODAL_ID + " .fabm-close svg{width:18px;height:18px}",
    ].join("");
    document.head.appendChild(s);
  }

  var fabModal, fabModalBackdrop;

  function openFabModal() {
    if (fabModalBackdrop) {
      fabModalBackdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  }
  function closeFabModal() {
    if (fabModalBackdrop) {
      fabModalBackdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  }

  function buildFabs() {
    if (document.getElementById(FAB_WRAP_ID)) return;

    var wrap = document.createElement("div");
    wrap.id = FAB_WRAP_ID;

    var phoneBtn = document.createElement("a");
    phoneBtn.href = "tel:" + PHONE_TEL;
    phoneBtn.setAttribute("aria-label", "Anrufen");
    phoneBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.34 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.54 2.81.66A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    wrap.appendChild(phoneBtn);

    var dirBtn = document.createElement("button");
    dirBtn.type = "button";
    dirBtn.setAttribute("aria-label", "Anfahrt & Parken");
    dirBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/></svg>';
    dirBtn.addEventListener("click", openFabModal);
    wrap.appendChild(dirBtn);

    document.body.appendChild(wrap);

    fabModalBackdrop = document.createElement("div");
    fabModalBackdrop.id = FAB_MODAL_BACKDROP_ID;
    fabModalBackdrop.addEventListener("click", function (e) {
      if (e.target === fabModalBackdrop) closeFabModal();
    });

    fabModal = document.createElement("div");
    fabModal.id = FAB_MODAL_ID;
    fabModal.setAttribute("role", "dialog");
    fabModal.setAttribute("aria-modal", "true");

    var closeBtn = document.createElement("button");
    closeBtn.className = "fabm-close";
    closeBtn.setAttribute("aria-label", "Schließen");
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    closeBtn.addEventListener("click", closeFabModal);
    fabModal.appendChild(closeBtn);

    var eyebrow = document.createElement("p");
    eyebrow.className = "fabm-eyebrow";
    eyebrow.textContent = "Anfahrt";
    fabModal.appendChild(eyebrow);

    var title = document.createElement("h2");
    title.className = "fabm-title";
    title.textContent = "So kommen Sie zu uns";
    fabModal.appendChild(title);

    var body = document.createElement("p");
    body.className = "fabm-body";
    body.textContent = "Direkter Routenplaner zur Praxis oder eines der nahegelegenen Parkhäuser auswählen.";
    fabModal.appendChild(body);

    var praxisLink = document.createElement("a");
    praxisLink.className = "fabm-praxis";
    praxisLink.href = PRAXIS_DIRECTIONS;
    praxisLink.target = "_blank";
    praxisLink.rel = "noopener noreferrer";
    praxisLink.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/></svg><span class="fabm-praxis-text">Routenplaner zur Praxis (' + PRAXIS_ADDR + ')</span>';
    fabModal.appendChild(praxisLink);

    var sectionLabel = document.createElement("p");
    sectionLabel.className = "fabm-sectionlabel";
    sectionLabel.textContent = "Parkhäuser in der Nähe";
    fabModal.appendChild(sectionLabel);

    var grid = document.createElement("div");
    grid.className = "fabm-grid";
    PARKHAEUSER.forEach(function (p) {
      var card = document.createElement("a");
      card.className = "fabm-card";
      card.href = p.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      var name = document.createElement("div");
      name.className = "fabm-card-name";
      name.textContent = p.name;
      var addr = document.createElement("div");
      addr.className = "fabm-card-addr";
      addr.textContent = p.address;
      var time = document.createElement("div");
      time.className = "fabm-card-time";
      time.textContent = p.walkingTime;
      card.appendChild(name);
      card.appendChild(addr);
      card.appendChild(time);
      grid.appendChild(card);
    });
    fabModal.appendChild(grid);

    fabModalBackdrop.appendChild(fabModal);
    document.body.appendChild(fabModalBackdrop);
  }

  var lastFabScrollY = 0;
  var fabScrollHideTimer = null;
  var fabScrollHandlerBound = false;
  function setupFabScrollHide() {
    if (fabScrollHandlerBound) return;
    fabScrollHandlerBound = true;
    lastFabScrollY = window.scrollY || 0;
    window.addEventListener("scroll", function () {
      var wrap = document.getElementById(FAB_WRAP_ID);
      if (!wrap) return;
      var y = window.scrollY || 0;
      var delta = y - lastFabScrollY;
      if (delta > 6 && y > 240) {
        wrap.classList.add("is-hidden");
      } else if (delta < -6 || y < 120) {
        wrap.classList.remove("is-hidden");
      }
      lastFabScrollY = y;
      if (fabScrollHideTimer) clearTimeout(fabScrollHideTimer);
      fabScrollHideTimer = setTimeout(function () {
        var w = document.getElementById(FAB_WRAP_ID);
        if (w) w.classList.remove("is-hidden");
      }, 1600);
    }, { passive: true });
  }

  function init() {
    ensureStyle();
    ensureFabStyle();
    build();
    buildFabs();
    setupFabScrollHide();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (drawer && drawer.classList.contains("is-open")) closeDrawer();
    if (fabModalBackdrop && fabModalBackdrop.classList.contains("is-open")) closeFabModal();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  var origPush = history.pushState;
  history.pushState = function () {
    var r = origPush.apply(this, arguments);
    setTimeout(closeDrawer, 50);
    setTimeout(init, 100);
    return r;
  };
  window.addEventListener("popstate", function () {
    setTimeout(closeDrawer, 50);
    setTimeout(init, 100);
  });
})();
