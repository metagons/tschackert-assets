(function () {
  if (typeof window === "undefined") return;
  if (window.__tschackertHeaderInit) return;
  window.__tschackertHeaderInit = true;

  // ==========================================================================
  // Constants
  // ==========================================================================
  var HEADER_ID = "tschackert-header";
  var BTN_ID = "tschackert-hamburger";
  var DRAWER_ID = "tschackert-drawer";
  var BACKDROP_ID = "tschackert-backdrop";
  var MEGA_ID = "tschackert-mega";
  var MEGA_BACKDROP_ID = "tschackert-mega-backdrop";
  var STYLE_ID = "tschackert-header-style";
  var Z = 2147483647;
  var MOBILE_BP = 860;

  var LOGO_URL = "https://framerusercontent.com/images/13Uiui9ACqyo6DnuT4zwgz38QdU.png?width=1176&height=281";
  var SERVICE_CDN = "https://cdn.jsdelivr.net/gh/metagons/tschackert-assets@main/services";

  // Featured services — highlighted at top
  var FEATURED_SERVICES = [
    { label: "Feste Zähne an einem Tag", desc: "SKY fast & fixed — neue Zähne in 24 h", href: "/leistungen/feste-zaehne-an-einem-tag", img: "pp0uv8", highlight: "dark" },
    { label: "Perfekte Veneers", desc: "Hauchdünne Keramik nach LVI-Methode", href: "/leistungen/veneers", img: "hye4ox", highlight: "gold" }
  ];

  // Other services — shown in grid below featured
  var OTHER_SERVICES = [
    { label: "Zahnimplantate", desc: "Künstliche Wurzeln", href: "/leistungen/zahnimplantate", img: "x6kw1r" },
    { label: "Kieferorthopädie", desc: "Transparente Aligner", href: "/leistungen/kieferorthopaedie", img: "s5k2oi" },
    { label: "CMD Funktionsdiagnostik", desc: "Migräne, Tinnitus, CMD", href: "/leistungen/cmd", img: "679tqr" },
    { label: "Angstpatienten", desc: "Sanfte Sedierung & Narkose", href: "/leistungen/angstpatienten", img: "3d622x" },
    { label: "Dental Power Splint", desc: "Patentierte Aufbissschiene", href: "/leistungen/dental-power-splint", img: "tmqg3w" },
    { label: "Prophylaxe", desc: "Individuelle Vorsorge", href: "/leistungen/prophylaxe", img: "fckkaz" },
    { label: "Bleaching", desc: "Schonende Aufhellung", href: "/leistungen/bleaching", img: "xn787w" },
    { label: "Zahnersatz", desc: "Aus eigenem Meisterlabor", href: "/leistungen/zahnersatz", img: "e5sn6a" },
    { label: "Parodontologie", desc: "Zahnfleischbehandlung", href: "/leistungen/parodontologie", img: "9tv28y" },
    { label: "Endodontie", desc: "Wurzelbehandlung 3D", href: "/leistungen/endodontie", img: "xouuoy" },
    { label: "Zahnerhalt", desc: "Substanz erhalten", href: "/leistungen/zahnerhalt", img: "pjdsmf" },
    { label: "Mock-up", desc: "Veneers vorab testen", href: "/leistungen/mock-up", img: "t4ayby" }
  ];

  var MAIN_NAV = [
    { label: "Startseite", href: "/" },
    { label: "Über Uns", href: "/ueber-uns" },
    { label: "Leistungen", href: "/leistungen", mega: true },
    { label: "Patientenstimmen", href: "/patientenstimmen" }
  ];

  var SECONDARY_NAV = [
    { label: "Team", href: "/team" },
    { label: "Medien", href: "/medien" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontakt", href: "/kontakt" }
  ];

  var CTA = { label: "Kostenlose Beratung", href: "/kontakt" };
  var PHONE_TEL = "+4969283030";
  var PHONE_DISPLAY = "+49 (0)69 28 30 30";
  var PRAXIS_ADDR_L1 = "Goethestraße 23";
  var PRAXIS_ADDR_L2 = "60313 Frankfurt am Main";
  var PRAXIS_EMAIL = "praxis@tschackert.com";

  // ==========================================================================
  // Styles
  // ==========================================================================
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = [
      // ── HIDE Framer's built-in Headers ──
      "nav:has([data-framer-name='Nav Links Wrapper']){display:none!important}",
      ".ssr-variant > div > nav:has([data-framer-name='Menu']){display:none!important}",
      "[data-framer-name='Header']{display:none!important}",

      // ── PUSH PAGE CONTENT BELOW OUR FIXED HEADER ──
      "body{padding-top:72px!important}",
      "@media (max-width:" + MOBILE_BP + "px){body{padding-top:64px!important}}",
      "html{scroll-padding-top:80px}",

      // ── HIDE NAV + FABS WHEN A MODAL/DRAWER IS OPEN ──
      "body[style*='overflow: hidden'] #" + HEADER_ID + ",",
      "body[style*='overflow:hidden'] #" + HEADER_ID + ",",
      "body[style*='overflow: hidden'] #tschackert-fab-wrap,",
      "body[style*='overflow:hidden'] #tschackert-fab-wrap{",
        "opacity:0!important;pointer-events:none!important;",
        "transition:opacity 200ms ease;",
      "}",

      // ── MOBILE TAP-TARGET ENFORCEMENT ──
      "@media (max-width:640px){",
        ".cta-button,.lh-primary,.ffs-button,.de-button,.bcc-button,.bfh-submit,.tr-secondary-btn,.sag-secondary-btn,.pf-arrow{",
          "min-height:44px!important;padding-top:12px!important;padding-bottom:12px!important;",
        "}",
        "div[class*='-container'] > a[href]{min-height:44px;display:inline-flex;align-items:center}",
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
      "#" + HEADER_ID + " .th-links{display:flex;gap:32px;align-items:center}",
      "#" + HEADER_ID + " .th-links a,#" + HEADER_ID + " .th-links button{",
        "font-size:14px;font-weight:500;color:rgb(20,44,47);",
        "text-decoration:none;letter-spacing:-0.005em;",
        "transition:color 160ms ease;background:none;border:0;padding:0;",
        "font-family:inherit;cursor:pointer;",
        "display:inline-flex;align-items:center;gap:6px;",
      "}",
      "#" + HEADER_ID + " .th-links a:hover,#" + HEADER_ID + " .th-links button:hover{color:rgba(20,44,47,0.65)}",
      "#" + HEADER_ID + " .th-links button svg{width:10px;height:10px;opacity:0.6;transition:transform 220ms ease}",
      "#" + HEADER_ID + " .th-links button.is-active{color:rgba(20,44,47,0.65)}",
      "#" + HEADER_ID + " .th-links button.is-active svg{transform:rotate(180deg);opacity:1}",
      "@media (max-width:" + MOBILE_BP + "px){#" + HEADER_ID + " .th-links{display:none}}",

      // Primary CTA (desktop only)
      "#" + HEADER_ID + " .th-cta{",
        "display:inline-flex;align-items:center;",
        "background:rgb(20,44,47);color:rgb(240,238,233);",
        "padding:10px 20px;border-radius:8px;border:0;",
        "font-size:14px;font-weight:500;letter-spacing:-0.005em;",
        "text-decoration:none;cursor:pointer;transition:background 160ms ease;",
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

      // ════════════════════════════════════════════════════════════════════
      // MEGA PANEL — desktop full-width Leistungen dropdown
      // ════════════════════════════════════════════════════════════════════
      "#" + MEGA_BACKDROP_ID + "{",
        "position:fixed;top:72px;left:0;right:0;bottom:0;",
        "background:rgba(20,44,47,0.35);",
        "-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);",
        "opacity:0;pointer-events:none;",
        "transition:opacity 280ms ease;",
        "z-index:" + (Z - 3) + ";",
      "}",
      "#" + MEGA_BACKDROP_ID + ".is-open{opacity:1;pointer-events:auto}",
      "@media (max-width:" + MOBILE_BP + "px){#" + MEGA_BACKDROP_ID + "{display:none!important}}",

      "#" + MEGA_ID + "{",
        "position:fixed;top:72px;left:0;right:0;",
        "background:rgb(255,255,255);",
        "border-bottom:1px solid rgba(20,44,47,0.06);",
        "box-shadow:0 24px 64px rgba(20,44,47,0.08);",
        "padding:36px 60px 44px;box-sizing:border-box;",
        "transform:translateY(-16px);opacity:0;pointer-events:none;",
        "transition:opacity 280ms ease, transform 280ms ease;",
        "z-index:" + (Z - 2) + ";max-height:calc(100vh - 72px);overflow-y:auto;",
      "}",
      "#" + MEGA_ID + ".is-open{opacity:1;pointer-events:auto;transform:translateY(0)}",
      "@media (max-width:1100px){#" + MEGA_ID + "{padding:32px 32px 40px}}",
      "@media (max-width:" + MOBILE_BP + "px){#" + MEGA_ID + "{display:none!important}}",

      "#" + MEGA_ID + " .th-mega-inner{max-width:1280px;margin:0 auto}",
      "#" + MEGA_ID + " .th-mega-head{",
        "display:flex;justify-content:space-between;align-items:flex-end;gap:24px;",
        "padding-bottom:24px;margin-bottom:24px;",
        "border-bottom:1px solid rgba(20,44,47,0.08);",
      "}",
      "#" + MEGA_ID + " .th-mega-head-text{display:flex;flex-direction:column}",
      "#" + MEGA_ID + " .th-mega-eyebrow{",
        "font-family:'Inter',sans-serif;font-size:11px;font-weight:500;",
        "letter-spacing:0.18em;text-transform:uppercase;color:rgb(74,106,110);",
        "margin:0 0 8px;",
      "}",
      "#" + MEGA_ID + " .th-mega-title{",
        "font-family:'Geist','Inter',sans-serif;font-size:30px;font-weight:500;",
        "letter-spacing:-0.025em;color:rgb(20,44,47);margin:0;line-height:1.1;",
      "}",
      "#" + MEGA_ID + " .th-mega-headcta{",
        "display:inline-flex;align-items:center;gap:8px;",
        "background:rgb(20,44,47);color:rgb(240,238,233);",
        "padding:13px 22px;border-radius:8px;",
        "font-family:'Inter',sans-serif;font-size:14px;font-weight:500;",
        "letter-spacing:-0.005em;text-decoration:none;",
        "transition:background 160ms ease;flex-shrink:0;",
      "}",
      "#" + MEGA_ID + " .th-mega-headcta:hover{background:rgb(8,22,24)}",
      "#" + MEGA_ID + " .th-mega-headcta svg{width:12px;height:12px}",

      // Featured row (2 big tiles)
      "#" + MEGA_ID + " .th-mega-featured{",
        "display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile{",
        "position:relative;display:flex;flex-direction:column;justify-content:flex-end;",
        "min-height:220px;padding:26px;border-radius:14px;overflow:hidden;",
        "text-decoration:none;color:inherit;transition:transform 280ms ease;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile:hover{transform:translateY(-3px)}",
      "#" + MEGA_ID + " .th-mega-tile-bg{",
        "position:absolute;inset:0;background-size:cover;background-position:center;",
        "opacity:0.22;transition:opacity 320ms ease;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile:hover .th-mega-tile-bg{opacity:0.32}",
      "#" + MEGA_ID + " .th-mega-tile-content{position:relative;z-index:1}",
      "#" + MEGA_ID + " .th-mega-tile-eyebrow{",
        "font-family:'Inter',sans-serif;font-size:11px;font-weight:500;",
        "letter-spacing:0.18em;text-transform:uppercase;margin:0 0 10px;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile-title{",
        "font-family:'Geist','Inter',sans-serif;font-size:24px;font-weight:500;",
        "letter-spacing:-0.02em;line-height:1.15;margin:0 0 8px;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile-desc{",
        "font-family:'Inter',sans-serif;font-size:14px;line-height:1.45;",
        "letter-spacing:-0.005em;margin:0;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile-arrow{",
        "position:absolute;top:24px;right:24px;",
        "width:36px;height:36px;border-radius:50%;",
        "display:flex;align-items:center;justify-content:center;z-index:1;",
        "transition:transform 280ms ease;",
      "}",
      "#" + MEGA_ID + " .th-mega-tile:hover .th-mega-tile-arrow{transform:translate(2px,-2px)}",
      "#" + MEGA_ID + " .th-mega-tile-arrow svg{width:14px;height:14px}",
      // Dark variant
      "#" + MEGA_ID + " .th-mega-tile--dark{background:rgb(20,44,47);color:rgb(240,238,233)}",
      "#" + MEGA_ID + " .th-mega-tile--dark .th-mega-tile-eyebrow{color:rgba(240,238,233,0.6)}",
      "#" + MEGA_ID + " .th-mega-tile--dark .th-mega-tile-desc{color:rgba(240,238,233,0.78)}",
      "#" + MEGA_ID + " .th-mega-tile--dark .th-mega-tile-arrow{background:rgba(255,255,255,0.14);color:rgb(240,238,233)}",
      // Off-white variant (Veneers) — soft warm cream, subtle elegance
      "#" + MEGA_ID + " .th-mega-tile--gold{",
        "background:rgb(240,234,222);color:rgb(20,44,47);",
        "border:1px solid rgba(20,44,47,0.06);",
      "}",
      "#" + MEGA_ID + " .th-mega-tile--gold .th-mega-tile-eyebrow{color:rgba(20,44,47,0.55)}",
      "#" + MEGA_ID + " .th-mega-tile--gold .th-mega-tile-desc{color:rgba(20,44,47,0.7)}",
      "#" + MEGA_ID + " .th-mega-tile--gold .th-mega-tile-arrow{background:rgba(20,44,47,0.08);color:rgb(20,44,47)}",

      // Other services
      "#" + MEGA_ID + " .th-mega-others-label{",
        "font-family:'Inter',sans-serif;font-size:11px;font-weight:500;",
        "letter-spacing:0.18em;text-transform:uppercase;color:rgb(74,106,110);",
        "margin:0 0 16px;",
      "}",
      "#" + MEGA_ID + " .th-mega-grid{",
        "display:grid;grid-template-columns:repeat(3,1fr);gap:4px;",
      "}",
      "@media (max-width:1100px){#" + MEGA_ID + " .th-mega-grid{grid-template-columns:repeat(2,1fr)}}",
      "#" + MEGA_ID + " .th-mega-item{",
        "display:flex;align-items:center;gap:14px;",
        "padding:10px 12px;border-radius:10px;",
        "text-decoration:none;color:rgb(20,44,47);",
        "transition:background 160ms ease;min-width:0;",
      "}",
      "#" + MEGA_ID + " .th-mega-item:hover{background:rgb(244,240,233)}",
      "#" + MEGA_ID + " .th-mega-thumb{",
        "width:40px;height:40px;border-radius:8px;",
        "background-size:cover;background-position:center;",
        "background-color:rgb(244,240,233);flex-shrink:0;",
      "}",
      "#" + MEGA_ID + " .th-mega-text{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}",
      "#" + MEGA_ID + " .th-mega-label{",
        "font-family:'Geist','Inter',sans-serif;font-size:14px;font-weight:500;",
        "color:rgb(20,44,47);letter-spacing:-0.015em;line-height:1.25;",
      "}",
      "#" + MEGA_ID + " .th-mega-desc{",
        "font-family:'Inter',sans-serif;font-size:12px;",
        "color:rgb(107,99,89);letter-spacing:-0.005em;line-height:1.4;",
        "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      "}",

      // ════════════════════════════════════════════════════════════════════
      // MOBILE DRAWER — Biograph-style full-page menu
      // ════════════════════════════════════════════════════════════════════
      "#" + BACKDROP_ID + "{",
        "position:fixed;top:0;right:0;bottom:0;left:0;z-index:" + (Z - 2) + ";",
        "background:rgba(20,44,47,0.4);",
        "-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);",
        "opacity:0;pointer-events:none;transition:opacity 220ms ease;",
      "}",
      "#" + BACKDROP_ID + ".is-open{opacity:1;pointer-events:auto}",

      "#" + DRAWER_ID + "{",
        "position:fixed;top:0;right:0;bottom:0;width:100%;max-width:480px;",
        "z-index:" + (Z - 1) + ";background:rgb(250,249,247);",
        "transform:translateX(100%);transition:transform 320ms cubic-bezier(.16,1,.3,1);",
        "box-shadow:-20px 0 40px rgba(20,44,47,0.1);",
        "display:flex;flex-direction:column;box-sizing:border-box;",
        "overflow-y:auto;",
      "}",
      "#" + DRAWER_ID + ".is-open{transform:translateX(0)}",

      "#" + DRAWER_ID + " .th-d-head{",
        "display:flex;justify-content:space-between;align-items:center;",
        "padding:18px 22px;border-bottom:1px solid rgba(20,44,47,0.08);",
        "position:sticky;top:0;background:rgba(250,249,247,0.96);",
        "-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:2;",
      "}",
      "#" + DRAWER_ID + " .th-d-logo img{height:30px;width:auto;display:block}",
      "#" + DRAWER_ID + " .th-d-close{",
        "width:40px;height:40px;border-radius:8px;",
        "background:rgba(20,44,47,0.06);border:0;cursor:pointer;",
        "display:flex;align-items:center;justify-content:center;",
        "color:rgb(20,44,47);padding:0;",
      "}",
      "#" + DRAWER_ID + " .th-d-close svg{width:16px;height:16px}",

      "#" + DRAWER_ID + " .th-d-body{padding:20px 22px 40px;display:flex;flex-direction:column;gap:24px}",

      // Top CTAs row
      "#" + DRAWER_ID + " .th-d-ctas{display:grid;grid-template-columns:1fr 1.6fr;gap:10px}",
      "#" + DRAWER_ID + " .th-d-cta-phone,#" + DRAWER_ID + " .th-d-cta-primary{",
        "display:inline-flex;align-items:center;justify-content:center;gap:8px;",
        "padding:14px 16px;border-radius:10px;min-height:48px;box-sizing:border-box;",
        "font-family:'Inter',sans-serif;font-size:14px;font-weight:500;",
        "letter-spacing:-0.005em;text-decoration:none;cursor:pointer;",
        "transition:background 160ms ease;",
      "}",
      "#" + DRAWER_ID + " .th-d-cta-phone{",
        "background:rgba(20,44,47,0.06);color:rgb(20,44,47);",
        "border:1px solid rgba(20,44,47,0.1);",
      "}",
      "#" + DRAWER_ID + " .th-d-cta-phone:hover{background:rgba(20,44,47,0.1)}",
      "#" + DRAWER_ID + " .th-d-cta-primary{background:rgb(20,44,47);color:rgb(240,238,233)}",
      "#" + DRAWER_ID + " .th-d-cta-primary:hover{background:rgb(8,22,24)}",
      "#" + DRAWER_ID + " .th-d-cta-phone svg,#" + DRAWER_ID + " .th-d-cta-primary svg{width:14px;height:14px}",

      // Featured tiles
      "#" + DRAWER_ID + " .th-d-featured{display:flex;flex-direction:column;gap:10px}",
      "#" + DRAWER_ID + " .th-d-tile{",
        "position:relative;display:flex;align-items:center;gap:14px;",
        "padding:16px 18px;border-radius:12px;text-decoration:none;color:inherit;",
        "overflow:hidden;",
      "}",
      "#" + DRAWER_ID + " .th-d-tile-thumb{",
        "width:52px;height:52px;border-radius:8px;",
        "background-size:cover;background-position:center;flex-shrink:0;",
      "}",
      "#" + DRAWER_ID + " .th-d-tile-text{",
        "flex:1;min-width:0;display:flex;flex-direction:column;gap:4px;",
      "}",
      "#" + DRAWER_ID + " .th-d-tile-label{",
        "display:block;",
        "font-family:'Geist','Inter',sans-serif;font-size:16px;font-weight:500;",
        "letter-spacing:-0.015em;line-height:1.25;",
      "}",
      "#" + DRAWER_ID + " .th-d-tile-desc{",
        "display:block;",
        "font-family:'Inter',sans-serif;font-size:12.5px;line-height:1.4;",
        "letter-spacing:-0.005em;",
      "}",
      "#" + DRAWER_ID + " .th-d-tile-arrow{",
        "width:28px;height:28px;border-radius:50%;",
        "display:flex;align-items:center;justify-content:center;flex-shrink:0;",
      "}",
      "#" + DRAWER_ID + " .th-d-tile-arrow svg{width:12px;height:12px}",
      // Dark
      "#" + DRAWER_ID + " .th-d-tile--dark{background:rgb(20,44,47);color:rgb(240,238,233)}",
      "#" + DRAWER_ID + " .th-d-tile--dark .th-d-tile-desc{color:rgba(240,238,233,0.72)}",
      "#" + DRAWER_ID + " .th-d-tile--dark .th-d-tile-arrow{background:rgba(255,255,255,0.14);color:rgb(240,238,233)}",
      // Off-white (Veneers) — soft warm cream
      "#" + DRAWER_ID + " .th-d-tile--gold{",
        "background:rgb(240,234,222);color:rgb(20,44,47);",
        "border:1px solid rgba(20,44,47,0.06);",
      "}",
      "#" + DRAWER_ID + " .th-d-tile--gold .th-d-tile-desc{color:rgba(20,44,47,0.65)}",
      "#" + DRAWER_ID + " .th-d-tile--gold .th-d-tile-arrow{background:rgba(20,44,47,0.08);color:rgb(20,44,47)}",

      // Section labels
      "#" + DRAWER_ID + " .th-d-sec-label{",
        "font-family:'Inter',sans-serif;font-size:11px;font-weight:500;",
        "letter-spacing:0.18em;text-transform:uppercase;color:rgb(74,106,110);",
        "margin:0 0 4px;",
      "}",

      // Primary nav
      "#" + DRAWER_ID + " .th-d-main{display:flex;flex-direction:column;gap:0}",
      "#" + DRAWER_ID + " .th-d-main a{",
        "display:flex;justify-content:space-between;align-items:center;",
        "padding:14px 0;border-bottom:1px solid rgba(20,44,47,0.08);",
        "font-family:'Geist','Inter',sans-serif;font-weight:500;",
        "font-size:18px;color:rgb(20,44,47);text-decoration:none;",
        "letter-spacing:-0.01em;transition:color 160ms ease;",
      "}",
      "#" + DRAWER_ID + " .th-d-main a:hover{color:rgba(20,44,47,0.6)}",
      "#" + DRAWER_ID + " .th-d-main a svg{width:12px;height:12px;opacity:0.4}",

      // Services list (2 cols, text only — readable, no truncation)
      "#" + DRAWER_ID + " .th-d-services{",
        "display:grid;grid-template-columns:1fr 1fr;gap:0 18px;",
      "}",
      "#" + DRAWER_ID + " .th-d-services a{",
        "padding:12px 0;border-bottom:1px solid rgba(20,44,47,0.06);",
        "font-family:'Inter',sans-serif;font-size:14px;font-weight:400;",
        "color:rgb(20,44,47);text-decoration:none;letter-spacing:-0.005em;",
        "transition:color 160ms ease;line-height:1.3;",
      "}",
      "#" + DRAWER_ID + " .th-d-services a:hover{color:rgba(20,44,47,0.55)}",
      "#" + DRAWER_ID + " .th-d-allservices{",
        "margin-top:10px;display:inline-flex;align-items:center;gap:8px;",
        "font-family:'Inter',sans-serif;font-size:13.5px;font-weight:500;",
        "color:rgb(20,44,47);text-decoration:none;",
        "padding:10px 0;",
      "}",
      "#" + DRAWER_ID + " .th-d-allservices svg{width:11px;height:11px}",

      // Secondary nav (2 cols small)
      "#" + DRAWER_ID + " .th-d-secondary{",
        "display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;",
      "}",
      "#" + DRAWER_ID + " .th-d-secondary a{",
        "padding:8px 0;",
        "font-family:'Inter',sans-serif;font-size:14px;color:rgb(74,106,110);",
        "text-decoration:none;letter-spacing:-0.005em;",
        "transition:color 160ms ease;",
      "}",
      "#" + DRAWER_ID + " .th-d-secondary a:hover{color:rgb(20,44,47)}",

      // Anfahrt section (directions + parking)
      "#" + DRAWER_ID + " .th-d-anfahrt{",
        "display:grid;grid-template-columns:1fr 1fr;gap:8px;",
      "}",
      "#" + DRAWER_ID + " .th-d-anfahrt button,#" + DRAWER_ID + " .th-d-anfahrt a{",
        "display:flex;flex-direction:column;align-items:flex-start;gap:6px;",
        "padding:14px 16px;border-radius:12px;",
        "background:rgb(255,255,255);border:1px solid rgba(20,44,47,0.08);",
        "color:rgb(20,44,47);text-decoration:none;cursor:pointer;",
        "font-family:'Inter',sans-serif;text-align:left;",
        "transition:background 160ms ease, transform 200ms ease;",
      "}",
      "#" + DRAWER_ID + " .th-d-anfahrt button:hover,#" + DRAWER_ID + " .th-d-anfahrt a:hover{",
        "background:rgb(250,247,240);transform:translateY(-1px);",
      "}",
      "#" + DRAWER_ID + " .th-d-anfahrt-icon{",
        "width:32px;height:32px;border-radius:8px;",
        "background:rgba(20,44,47,0.08);",
        "display:inline-flex;align-items:center;justify-content:center;",
        "color:rgb(20,44,47);",
      "}",
      "#" + DRAWER_ID + " .th-d-anfahrt-icon svg{width:16px;height:16px}",
      "#" + DRAWER_ID + " .th-d-anfahrt-label{",
        "font-family:'Geist','Inter',sans-serif;font-size:14px;font-weight:500;",
        "letter-spacing:-0.01em;line-height:1.2;",
      "}",
      "#" + DRAWER_ID + " .th-d-anfahrt-desc{",
        "font-size:11.5px;color:rgb(107,99,89);letter-spacing:-0.005em;",
        "line-height:1.35;",
      "}",

      // Contact info footer
      "#" + DRAWER_ID + " .th-d-contact{",
        "padding-top:20px;border-top:1px solid rgba(20,44,47,0.08);",
        "display:flex;flex-direction:column;gap:4px;",
        "font-family:'Inter',sans-serif;font-size:13px;line-height:1.6;",
        "color:rgb(107,99,89);letter-spacing:-0.005em;",
      "}",
      "#" + DRAWER_ID + " .th-d-contact a{color:rgb(74,106,110);text-decoration:none}",
      "#" + DRAWER_ID + " .th-d-contact a:hover{color:rgb(20,44,47)}",
    ].join("");
    document.head.appendChild(s);
  }

  // ==========================================================================
  // State + element refs
  // ==========================================================================
  var header, btn, drawer, backdrop;
  var megaPanel, megaBackdrop, leistungenTrigger;

  // ==========================================================================
  // Mega panel (desktop)
  // ==========================================================================
  function buildMegaPanel() {
    megaBackdrop = document.createElement("div");
    megaBackdrop.id = MEGA_BACKDROP_ID;
    megaBackdrop.addEventListener("click", closeMega);

    megaPanel = document.createElement("div");
    megaPanel.id = MEGA_ID;
    megaPanel.setAttribute("role", "menu");
    megaPanel.setAttribute("aria-label", "Unsere Leistungen");

    var inner = document.createElement("div");
    inner.className = "th-mega-inner";

    // Head
    var head = document.createElement("div");
    head.className = "th-mega-head";
    var headText = document.createElement("div");
    headText.className = "th-mega-head-text";
    headText.innerHTML =
      '<p class="th-mega-eyebrow">Unsere Leistungen</p>' +
      '<h2 class="th-mega-title">Vierzehn Spezialgebiete. Eine Praxis.</h2>';
    head.appendChild(headText);

    var headCta = document.createElement("a");
    headCta.className = "th-mega-headcta";
    headCta.href = CTA.href;
    headCta.innerHTML = CTA.label + '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6 L10 6 M7 3 L10 6 L7 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    head.appendChild(headCta);
    inner.appendChild(head);

    // Featured row (2 large tiles)
    var featured = document.createElement("div");
    featured.className = "th-mega-featured";
    FEATURED_SERVICES.forEach(function (s) {
      var tile = document.createElement("a");
      tile.className = "th-mega-tile th-mega-tile--" + s.highlight;
      tile.href = s.href;
      tile.innerHTML =
        '<div class="th-mega-tile-bg" style="background-image:url(\'' + SERVICE_CDN + '/' + s.img + '.webp\')"></div>' +
        '<div class="th-mega-tile-arrow"><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div class="th-mega-tile-content">' +
          '<p class="th-mega-tile-eyebrow">' + (s.highlight === "dark" ? "Unsere Spezialität" : "Premium Ästhetik") + '</p>' +
          '<h3 class="th-mega-tile-title">' + s.label + '</h3>' +
          '<p class="th-mega-tile-desc">' + s.desc + '</p>' +
        '</div>';
      featured.appendChild(tile);
    });
    inner.appendChild(featured);

    // Others label + grid
    var othersLabel = document.createElement("p");
    othersLabel.className = "th-mega-others-label";
    othersLabel.textContent = "Weitere Leistungen";
    inner.appendChild(othersLabel);

    var grid = document.createElement("div");
    grid.className = "th-mega-grid";
    OTHER_SERVICES.forEach(function (s) {
      var item = document.createElement("a");
      item.className = "th-mega-item";
      item.href = s.href;
      item.innerHTML =
        '<span class="th-mega-thumb" style="background-image:url(\'' + SERVICE_CDN + '/' + s.img + '.webp\')"></span>' +
        '<span class="th-mega-text">' +
          '<span class="th-mega-label">' + s.label + '</span>' +
          '<span class="th-mega-desc">' + s.desc + '</span>' +
        '</span>';
      grid.appendChild(item);
    });
    inner.appendChild(grid);

    megaPanel.appendChild(inner);
  }

  function openMega() {
    if (!megaPanel) return;
    megaPanel.classList.add("is-open");
    megaBackdrop.classList.add("is-open");
    if (leistungenTrigger) leistungenTrigger.classList.add("is-active");
  }

  function closeMega() {
    if (!megaPanel) return;
    megaPanel.classList.remove("is-open");
    megaBackdrop.classList.remove("is-open");
    if (leistungenTrigger) leistungenTrigger.classList.remove("is-active");
  }

  // ==========================================================================
  // Mobile drawer
  // ==========================================================================
  function buildDrawerContent() {
    var head = document.createElement("div");
    head.className = "th-d-head";

    var headLogo = document.createElement("a");
    headLogo.href = "/";
    headLogo.className = "th-d-logo";
    headLogo.setAttribute("aria-label", "Dr. Tschackert");
    headLogo.addEventListener("click", closeDrawer);
    var img = document.createElement("img");
    img.src = LOGO_URL;
    img.alt = "Dr. Tschackert";
    headLogo.appendChild(img);
    head.appendChild(headLogo);

    var closeBtn = document.createElement("button");
    closeBtn.className = "th-d-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Menü schließen");
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    closeBtn.addEventListener("click", closeDrawer);
    head.appendChild(closeBtn);

    drawer.appendChild(head);

    var body = document.createElement("div");
    body.className = "th-d-body";

    // CTAs
    var ctas = document.createElement("div");
    ctas.className = "th-d-ctas";
    var phoneBtn = document.createElement("a");
    phoneBtn.className = "th-d-cta-phone";
    phoneBtn.href = "tel:" + PHONE_TEL;
    phoneBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.34 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.54 2.81.66A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Anrufen</span>';
    ctas.appendChild(phoneBtn);
    var primaryCta = document.createElement("a");
    primaryCta.className = "th-d-cta-primary";
    primaryCta.href = CTA.href;
    primaryCta.textContent = CTA.label;
    primaryCta.addEventListener("click", closeDrawer);
    ctas.appendChild(primaryCta);
    body.appendChild(ctas);

    // Featured tiles
    var featured = document.createElement("div");
    featured.className = "th-d-featured";
    FEATURED_SERVICES.forEach(function (s) {
      var tile = document.createElement("a");
      tile.className = "th-d-tile th-d-tile--" + s.highlight;
      tile.href = s.href;
      tile.addEventListener("click", closeDrawer);
      tile.innerHTML =
        '<span class="th-d-tile-thumb" style="background-image:url(\'' + SERVICE_CDN + '/' + s.img + '.webp\')"></span>' +
        '<span class="th-d-tile-text">' +
          '<span class="th-d-tile-label">' + s.label + '</span>' +
          '<span class="th-d-tile-desc">' + s.desc + '</span>' +
        '</span>' +
        '<span class="th-d-tile-arrow"><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      featured.appendChild(tile);
    });
    body.appendChild(featured);

    // Main nav section
    var mainLabel = document.createElement("p");
    mainLabel.className = "th-d-sec-label";
    mainLabel.textContent = "Navigation";
    body.appendChild(mainLabel);

    var main = document.createElement("div");
    main.className = "th-d-main";
    MAIN_NAV.forEach(function (n) {
      var a = document.createElement("a");
      a.href = n.href;
      a.innerHTML = '<span>' + n.label + '</span><svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6 L10 6 M7 3 L10 6 L7 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      a.addEventListener("click", closeDrawer);
      main.appendChild(a);
    });
    body.appendChild(main);

    // Other services section
    var svcLabel = document.createElement("p");
    svcLabel.className = "th-d-sec-label";
    svcLabel.textContent = "Alle Leistungen";
    body.appendChild(svcLabel);

    var services = document.createElement("div");
    services.className = "th-d-services";
    OTHER_SERVICES.forEach(function (s) {
      var a = document.createElement("a");
      a.href = s.href;
      a.textContent = s.label;
      a.addEventListener("click", closeDrawer);
      services.appendChild(a);
    });
    body.appendChild(services);

    var allLink = document.createElement("a");
    allLink.className = "th-d-allservices";
    allLink.href = "/leistungen";
    allLink.innerHTML = '<span>Alle Leistungen ansehen</span><svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6 L10 6 M7 3 L10 6 L7 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    allLink.addEventListener("click", closeDrawer);
    body.appendChild(allLink);

    // Secondary nav
    var secLabel = document.createElement("p");
    secLabel.className = "th-d-sec-label";
    secLabel.textContent = "Mehr";
    body.appendChild(secLabel);

    var secondary = document.createElement("div");
    secondary.className = "th-d-secondary";
    SECONDARY_NAV.forEach(function (n) {
      var a = document.createElement("a");
      a.href = n.href;
      a.textContent = n.label;
      a.addEventListener("click", closeDrawer);
      secondary.appendChild(a);
    });
    body.appendChild(secondary);

    // Anfahrt section
    var anfLabel = document.createElement("p");
    anfLabel.className = "th-d-sec-label";
    anfLabel.textContent = "Anfahrt";
    body.appendChild(anfLabel);

    var anfahrt = document.createElement("div");
    anfahrt.className = "th-d-anfahrt";

    var dirLink = document.createElement("a");
    dirLink.href = "https://www.google.com/maps/dir/?api=1&destination=Goethestra%C3%9Fe+23+60313+Frankfurt";
    dirLink.target = "_blank";
    dirLink.rel = "noopener noreferrer";
    dirLink.innerHTML =
      '<span class="th-d-anfahrt-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/></svg></span>' +
      '<span class="th-d-anfahrt-label">Routenplaner</span>' +
      '<span class="th-d-anfahrt-desc">Direkter Weg zur Praxis</span>';
    anfahrt.appendChild(dirLink);

    var parkBtn = document.createElement("button");
    parkBtn.type = "button";
    parkBtn.innerHTML =
      '<span class="th-d-anfahrt-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span class="th-d-anfahrt-label">Parkhäuser</span>' +
      '<span class="th-d-anfahrt-desc">6 Optionen in der Nähe</span>';
    parkBtn.addEventListener("click", function () {
      closeDrawer();
      // Defer so drawer can finish closing before modal opens
      setTimeout(openFabModal, 200);
    });
    anfahrt.appendChild(parkBtn);

    body.appendChild(anfahrt);

    // Contact footer
    var contact = document.createElement("div");
    contact.className = "th-d-contact";
    contact.innerHTML =
      '<div>' + PRAXIS_ADDR_L1 + '</div>' +
      '<div>' + PRAXIS_ADDR_L2 + '</div>' +
      '<div><a href="tel:' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a></div>' +
      '<div><a href="mailto:' + PRAXIS_EMAIL + '">' + PRAXIS_EMAIL + '</a></div>';
    body.appendChild(contact);

    drawer.appendChild(body);
  }

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // ==========================================================================
  // Build the header + drawer + mega panel
  // ==========================================================================
  function build() {
    if (document.getElementById(HEADER_ID)) return;

    header = document.createElement("nav");
    header.id = HEADER_ID;
    header.setAttribute("aria-label", "Hauptnavigation");

    // Logo
    var logoLink = document.createElement("a");
    logoLink.href = "/";
    logoLink.className = "th-logo";
    logoLink.setAttribute("aria-label", "Dr. Tschackert");
    var logoImg = document.createElement("img");
    logoImg.src = LOGO_URL;
    logoImg.alt = "Dr. Tschackert";
    logoLink.appendChild(logoImg);
    header.appendChild(logoLink);

    // Desktop nav links
    var links = document.createElement("div");
    links.className = "th-links";
    MAIN_NAV.forEach(function (n) {
      if (n.mega) {
        var trigger = document.createElement("button");
        trigger.type = "button";
        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");
        trigger.innerHTML = n.label + '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4.5 L6 8 L10 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        trigger.addEventListener("click", function (e) {
          e.stopPropagation();
          if (megaPanel.classList.contains("is-open")) closeMega();
          else openMega();
        });
        leistungenTrigger = trigger;
        links.appendChild(trigger);
      } else {
        var a = document.createElement("a");
        a.href = n.href;
        a.textContent = n.label;
        links.appendChild(a);
      }
    });
    header.appendChild(links);

    // CTA (desktop)
    var cta = document.createElement("a");
    cta.className = "th-cta";
    cta.href = CTA.href;
    cta.textContent = CTA.label;
    header.appendChild(cta);

    // Hamburger (mobile)
    btn = document.createElement("button");
    btn.id = BTN_ID;
    btn.type = "button";
    btn.setAttribute("aria-label", "Menü öffnen");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    btn.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });
    header.appendChild(btn);

    // Backdrop + drawer
    backdrop = document.createElement("div");
    backdrop.id = BACKDROP_ID;
    backdrop.addEventListener("click", closeDrawer);

    drawer = document.createElement("div");
    drawer.id = DRAWER_ID;
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    buildDrawerContent();

    // Mega panel (desktop)
    buildMegaPanel();

    // Append
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    document.body.appendChild(header);
    document.body.appendChild(megaBackdrop);
    document.body.appendChild(megaPanel);
  }

  // ==========================================================================
  // FAB system (Phone + Parkhäuser)
  // ==========================================================================
  var FAB_WRAP_ID = "tschackert-fab-wrap";
  var FAB_MODAL_ID = "tschackert-fab-modal";
  var FAB_MODAL_BACKDROP_ID = "tschackert-fab-modal-backdrop";

  var PRAXIS_ADDR = "Goethestraße 23, 60313 Frankfurt am Main";
  var PRAXIS_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=Goethestra%C3%9Fe+23+60313+Frankfurt";

  var PARKHAEUSER = [
    { name: "Parkhaus Goetheplatz", address: "Goetheplatz 2A", walkingTime: "1 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Parkhaus+Goetheplatz+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Tiefgarage Junghofstraße", address: "Junghofstraße", walkingTime: "2 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Tiefgarage+Junghofstra%C3%9Fe+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Parkhaus Börse", address: "Börsenstraße", walkingTime: "3 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Parkhaus+B%C3%B6rse+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Parkhaus Alte Oper", address: "Opernplatz", walkingTime: "4 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Parkhaus+Alte+Oper+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Q-Park Opernplatz", address: "Opernplatz", walkingTime: "4 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Q-Park+Opernplatz+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" },
    { name: "Hauptwache Car Park", address: "Kornmarkt 10", walkingTime: "5 Min. zu Fuß", url: "https://www.google.com/maps/dir/?api=1&origin=Hauptwache+Car+Park+Frankfurt&destination=Goethestra%C3%9Fe+23+60313+Frankfurt" }
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
      "#" + FAB_MODAL_ID + " .fabm-close svg{width:18px;height:18px}"
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

  // ==========================================================================
  // Init + lifecycle
  // ==========================================================================
  function init() {
    ensureStyle();
    ensureFabStyle();
    build();
    buildFabs();
    setupFabScrollHide();
  }

  // Close mega/drawer on ESC
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (megaPanel && megaPanel.classList.contains("is-open")) closeMega();
    if (drawer && drawer.classList.contains("is-open")) closeDrawer();
    if (fabModalBackdrop && fabModalBackdrop.classList.contains("is-open")) closeFabModal();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-init on SPA navigation (Framer client-side routing)
  var origPush = history.pushState;
  history.pushState = function () {
    var r = origPush.apply(this, arguments);
    setTimeout(closeDrawer, 50);
    setTimeout(closeMega, 50);
    setTimeout(init, 100);
    return r;
  };
  window.addEventListener("popstate", function () {
    setTimeout(closeDrawer, 50);
    setTimeout(closeMega, 50);
    setTimeout(init, 100);
  });
})();
