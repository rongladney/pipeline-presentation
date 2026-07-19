/* Build "The AI Economy and the Future Workforce" slide deck.
 * Synthesizes three research papers by Ronnie Gladney (first author).
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const icons = require("react-icons/fa");

// ---------- palette ----------
const NAVY = "13224F";   // dominant dark
const NAVY2 = "1E2761";
const ICE = "CADCFC";
const CARD = "EFF4FC";   // light card tint
const GOLD = "D89A2B";   // accent for key stats
const BLUE = "2E6FD8";   // chart primary
const LTBLUE = "9DC1F0";
const MIDBLUE = "5E93E2";
const RED = "C94C44";
const GREEN = "2E7D4F";
const INK = "1A1A1A";
const GRAY = "5A5A5A";
const WHITE = "FFFFFF";

const TITLE_FONT = "Cambria";
const BODY_FONT = "Calibri";

async function iconPng(IconComp, hexColor, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComp, { color: "#" + hexColor, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  const W = 13.33, H = 7.5;

  // pre-render icons
  const ic = {};
  const wants = {
    chart: [icons.FaChartLine, WHITE], invest: [icons.FaCoins, WHITE],
    users: [icons.FaUsers, WHITE], grad: [icons.FaGraduationCap, WHITE],
    bolt: [icons.FaBolt, WHITE], school: [icons.FaSchool, WHITE],
    teach: [icons.FaChalkboardTeacher, WHITE], landmark: [icons.FaLandmark, WHITE],
    book: [icons.FaBookOpen, WHITE], shield: [icons.FaShieldAlt, WHITE],
    brief: [icons.FaBriefcase, WHITE], gear: [icons.FaUserCog, WHITE],
    mobile: [icons.FaMobileAlt, WHITE], tag: [icons.FaTag, WHITE],
    plug: [icons.FaPlug, WHITE], seed: [icons.FaSeedling, WHITE],
    balance: [icons.FaBalanceScale, WHITE], compass: [icons.FaCompass, WHITE],
    arrowUp: [icons.FaArrowUp, GREEN], arrowDn: [icons.FaArrowDown, RED],
    flag: [icons.FaFlagCheckered, WHITE], globe: [icons.FaGlobeAmericas, WHITE],
  };
  for (const [k, [comp, col]] of Object.entries(wants)) ic[k] = await iconPng(comp, col);

  // ---------- helpers ----------
  function kicker(slide, text, opts = {}) {
    slide.addText(text.toUpperCase(), {
      x: 0.6, y: 0.32, w: 9.5, h: 0.32, fontFace: BODY_FONT, fontSize: 12,
      color: opts.color || GOLD, bold: true, charSpacing: 3, margin: 0,
    });
  }
  function slideTitle(slide, text, opts = {}) {
    slide.addText(text, {
      x: 0.6, y: 0.62, w: opts.w || 12.1, h: 0.85, fontFace: TITLE_FONT,
      fontSize: 30, bold: true, color: opts.color || NAVY, margin: 0,
    });
  }
  function pageFoot(slide, n, dark = false) {
    slide.addText(`Gladney (2026) — The AI Economy & the Future Workforce`, {
      x: 0.6, y: 7.08, w: 8.0, h: 0.3, fontFace: BODY_FONT, fontSize: 9,
      color: dark ? ICE : GRAY, margin: 0,
    });
    slide.addText(String(n), {
      x: 12.5, y: 7.08, w: 0.5, h: 0.3, fontFace: BODY_FONT, fontSize: 9,
      color: dark ? ICE : GRAY, align: "right", margin: 0,
    });
  }
  function circleIcon(slide, key, x, y, d = 0.52, fill = NAVY) {
    slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
    const pad = d * 0.26;
    slide.addImage({ data: ic[key], x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
  }
  const quietCat = { catAxisLabelColor: GRAY, catAxisLabelFontSize: 11, catAxisLabelFontFace: BODY_FONT, catGridLine: { style: "none" } };
  const quietVal = { valAxisLabelColor: GRAY, valAxisLabelFontSize: 10, valAxisLabelFontFace: BODY_FONT, valGridLine: { color: "E4E9F2", size: 1 } };

  // =========================================================== Slide 1 — title
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    // subtle oversized backdrop numeral
    s.addText("AI", {
      x: 8.1, y: 1.4, w: 5.4, h: 5.6, fontFace: TITLE_FONT, fontSize: 300,
      bold: true, color: NAVY2, align: "center", valign: "middle", margin: 0,
    });
    s.addText("RESEARCH BRIEFING  ·  JULY 2026", {
      x: 0.75, y: 1.55, w: 8, h: 0.35, fontFace: BODY_FONT, fontSize: 13,
      color: GOLD, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText("The AI Economy and\nthe Future Workforce", {
      x: 0.75, y: 2.0, w: 9.6, h: 2.2, fontFace: TITLE_FONT, fontSize: 48,
      bold: true, color: WHITE, margin: 0, lineSpacing: 56,
    });
    s.addText("Societal impact, economic benefits, AI literacy & education,\nand a KSA → OKR → KPI framework for AI-job readiness", {
      x: 0.75, y: 4.35, w: 9.2, h: 0.9, fontFace: BODY_FONT, fontSize: 17,
      color: ICE, margin: 0, lineSpacing: 24,
    });
    s.addText([
      { text: "Ronnie Gladney", options: { bold: true, color: WHITE } },
      { text: "   ·   AI Consultant   ·   First Author", options: { color: ICE } },
    ], { x: 0.75, y: 5.75, w: 9, h: 0.4, fontFace: BODY_FONT, fontSize: 15, margin: 0 });
    s.addText("Synthesis of three companion research papers · 30+ primary sources incl. Stanford AI Index 2025–26, WEF, PwC, IMF, BLS, NBER, Science", {
      x: 0.75, y: 6.25, w: 10.5, h: 0.4, fontFace: BODY_FONT, fontSize: 11.5,
      color: LTBLUE, italic: true, margin: 0,
    });
  }

  // =========================================================== Slide 2 — headline numbers
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Executive summary");
    slideTitle(s, "The economy has already committed to AI");
    const cards = [
      { n: "$581.7B", l: "global corporate AI investment in 2025 — 2.3× the 2024 total", src: "Stanford AI Index 2026" },
      { n: "88%", l: "of organizations used AI in at least one function in 2025", src: "AI Index 2026 / McKinsey" },
      { n: "+78M", l: "net new jobs projected worldwide by 2030 (170M created, 92M displaced)", src: "WEF Future of Jobs 2025" },
      { n: "62%", l: "wage premium for workers with AI skills — up from 25% two years ago", src: "PwC AI Jobs Barometer 2026" },
      { n: "4 in 5", l: "U.S. high-school & college students already use AI for schoolwork", src: "Stanford AI Index 2026" },
    ];
    const cw = 2.34, gap = 0.16, x0 = 0.6, y0 = 1.85, ch = 3.6;
    cards.forEach((c, i) => {
      const x = x0 + i * (cw + gap);
      s.addShape(pres.ShapeType.roundRect, {
        x, y: y0, w: cw, h: ch, fill: { color: i === 0 ? NAVY : CARD },
        rectRadius: 0.08, line: { type: "none" },
      });
      s.addText(c.n, {
        x: x + 0.15, y: y0 + 0.35, w: cw - 0.3, h: 0.95, fontFace: TITLE_FONT,
        fontSize: 29, bold: true, color: i === 0 ? GOLD : NAVY, margin: 0,
      });
      s.addText(c.l, {
        x: x + 0.15, y: y0 + 1.45, w: cw - 0.3, h: 1.5, fontFace: BODY_FONT,
        fontSize: 12.5, color: i === 0 ? WHITE : INK, margin: 0, lineSpacing: 16,
      });
      s.addText(c.src, {
        x: x + 0.15, y: y0 + 3.05, w: cw - 0.3, h: 0.45, fontFace: BODY_FONT,
        fontSize: 9, italic: true, color: i === 0 ? LTBLUE : GRAY, margin: 0,
      });
    });
    s.addText([
      { text: "The question is no longer whether AI reshapes work — it is ", options: { color: INK } },
      { text: "who is ready when it does.", options: { bold: true, color: NAVY } },
    ], { x: 0.6, y: 5.85, w: 12.1, h: 0.5, fontFace: BODY_FONT, fontSize: 17, margin: 0 });
    pageFoot(s, 2);
  }

  // =========================================================== Slide 3 — adoption + investment
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Societal impact");
    slideTitle(s, "Adoption crossed the mainstream threshold");
    s.addChart(pres.ChartType.line, [{
      name: "Organizations using AI",
      labels: ["2017", "2022", "2023", "2024", "2025"],
      values: [20, 50, 55, 78, 88],
    }], {
      x: 0.6, y: 1.8, w: 7.1, h: 4.5,
      chartColors: [BLUE], lineSize: 3, lineSmooth: false,
      lineDataSymbol: "circle", lineDataSymbolSize: 9,
      showValue: true, dataLabelPosition: "t", dataLabelColor: NAVY,
      dataLabelFontBold: true, dataLabelFontSize: 12, dataLabelFontFace: BODY_FONT,
      dataLabelFormatCode: '0"%"',
      showLegend: false, showTitle: true,
      title: "Share of organizations using AI in ≥1 business function (%)",
      titleColor: GRAY, titleFontSize: 12, titleFontFace: BODY_FONT,
      valAxisMaxVal: 100, valAxisMinVal: 0, valAxisMajorUnit: 25,
      ...quietCat, ...quietVal,
    });
    const facts = [
      ["invest", "Investment more than doubled", "$252.3B → $581.7B in one year; generative AI took nearly half of private funding."],
      ["globe", "Concentrated geography", "U.S. private AI investment of $285.9B in 2025 was ~23× China's tracked $12.4B."],
      ["chart", "Spending keeps compounding", "Total worldwide AI spend is projected to reach $2.59T in 2026 (+47% YoY)."],
    ];
    let fy = 2.0;
    for (const [key, h, b] of facts) {
      circleIcon(s, key, 8.0, fy, 0.5);
      s.addText(h, { x: 8.68, y: fy - 0.06, w: 4.05, h: 0.35, fontFace: BODY_FONT, fontSize: 14.5, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 8.68, y: fy + 0.3, w: 4.05, h: 0.95, fontFace: BODY_FONT, fontSize: 12, color: INK, margin: 0, lineSpacing: 15 });
      fy += 1.5;
    }
    s.addText("Sources: Stanford HAI AI Index 2025 & 2026; McKinsey Global Survey on AI.", {
      x: 0.6, y: 6.55, w: 12, h: 0.3, fontFace: BODY_FONT, fontSize: 9.5, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 3);
  }

  // =========================================================== Slide 4 — the prize
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Macroeconomic evidence");
    slideTitle(s, "A multi-trillion-dollar prize — already materializing");
    s.addChart(pres.ChartType.bar, [{
      name: "Estimate",
      labels: ["PwC — added to global\nGDP by 2030", "Goldman Sachs — GDP\nlift over a decade", "McKinsey — annual value,\ngenerative AI (midpoint)"],
      values: [15.7, 7.0, 3.5],
    }], {
      x: 0.6, y: 1.85, w: 7.1, h: 4.35, barDir: "col", barGapWidthPct: 60,
      chartColors: [NAVY, BLUE, LTBLUE],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: NAVY,
      dataLabelFontBold: true, dataLabelFontSize: 13, dataLabelFontFace: BODY_FONT,
      dataLabelFormatCode: '"$"0.0"T"',
      showLegend: false, showTitle: true,
      title: "Institutional estimates of AI's economic impact (USD trillions)",
      titleColor: GRAY, titleFontSize: 12, titleFontFace: BODY_FONT,
      catAxisLabelFontSize: 10, catAxisLabelColor: GRAY, catAxisLabelFontFace: BODY_FONT,
      catGridLine: { style: "none" }, ...quietVal,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 8.0, y: 1.85, w: 4.73, h: 4.35, fill: { color: NAVY }, rectRadius: 0.08 });
    s.addText("It is no longer only a forecast", {
      x: 8.3, y: 2.15, w: 4.15, h: 0.4, fontFace: TITLE_FONT, fontSize: 17, bold: true, color: GOLD, margin: 0,
    });
    const proofs = [
      ["~0.5 pp", "of U.S. GDP growth in 2025 attributable to AI investment (IMF, Jul 2026)"],
      ["$172B", "in annual value already delivered to U.S. consumers by generative AI tools"],
      ["43%", "of U.S. workers use AI on the job, covering 5.2% of all U.S. work hours"],
    ];
    let py = 2.75;
    for (const [n, t] of proofs) {
      s.addText(n, { x: 8.3, y: py, w: 1.5, h: 0.6, fontFace: TITLE_FONT, fontSize: 22, bold: true, color: WHITE, margin: 0 });
      s.addText(t, { x: 9.85, y: py + 0.02, w: 2.62, h: 1.0, fontFace: BODY_FONT, fontSize: 11, color: ICE, margin: 0, lineSpacing: 13.5 });
      py += 1.12;
    }
    s.addText("Estimates differ in scope and time base (cumulative vs. decade vs. annual) — a range, not a race.", {
      x: 0.6, y: 6.4, w: 12, h: 0.35, fontFace: BODY_FONT, fontSize: 10, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 4);
  }

  // =========================================================== Slide 5 — productivity
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Macroeconomic evidence");
    slideTitle(s, "Productivity gains are proven, not promised");
    s.addChart(pres.ChartType.bar, [{
      name: "Measured gain",
      labels: ["Customer support overall — Brynjolfsson et al. (NBER)",
               "Novice support agents — Brynjolfsson et al. (NBER)",
               "Business-writing speed — Noy & Zhang (Science)",
               "Coding task speed — Peng et al. (GitHub Copilot)"],
      values: [14, 34, 40, 55.8],
    }], {
      x: 0.6, y: 1.8, w: 8.1, h: 4.3, barDir: "bar", barGapWidthPct: 55,
      chartColors: [LTBLUE, MIDBLUE, BLUE, NAVY],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: NAVY,
      dataLabelFontBold: true, dataLabelFontSize: 13, dataLabelFontFace: BODY_FONT,
      dataLabelFormatCode: '"+"0.#"%"',
      showLegend: false, showTitle: true,
      title: "Productivity improvement in controlled studies of generative-AI assistance",
      titleColor: GRAY, titleFontSize: 12, titleFontFace: BODY_FONT,
      catAxisLabelFontSize: 10.5, catAxisLabelColor: INK, catAxisLabelFontFace: BODY_FONT,
      catGridLine: { style: "none" }, ...quietVal, valAxisHidden: true,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 9.0, y: 1.9, w: 3.73, h: 4.1, fill: { color: CARD }, rectRadius: 0.08 });
    circleIcon(s, "bolt", 9.3, 2.25, 0.55);
    s.addText("The equity finding", {
      x: 9.3, y: 3.0, w: 3.15, h: 0.4, fontFace: TITLE_FONT, fontSize: 16, bold: true, color: NAVY, margin: 0,
    });
    s.addText([
      { text: "Novices gain 34% vs. 14% on average — AI compresses the experience gap. ", options: { color: INK } },
      { text: "Deployed as an assistant, AI is an equality-enhancing technology.", options: { bold: true, color: NAVY } },
    ], { x: 9.3, y: 3.45, w: 3.15, h: 2.2, fontFace: BODY_FONT, fontSize: 12.5, margin: 0, lineSpacing: 17 });
    s.addText("Industry level: productivity growth in AI-exposed industries nearly quadrupled — 7% (2018–22) → 27% (2018–24). (PwC)", {
      x: 0.6, y: 6.35, w: 12.1, h: 0.4, fontFace: BODY_FONT, fontSize: 11.5, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 5);
  }

  // =========================================================== Slide 6 — jobs 2030
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "The future workforce");
    slideTitle(s, "Restructuring, not wholesale replacement");
    s.addChart(pres.ChartType.bar, [{
      name: "Jobs by 2030",
      labels: ["New roles created", "Roles displaced", "Net change"],
      values: [170, -92, 78],
    }], {
      x: 0.6, y: 1.85, w: 7.0, h: 4.3, barDir: "col", barGapWidthPct: 65,
      chartColors: [BLUE, RED, LTBLUE],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: NAVY,
      dataLabelFontBold: true, dataLabelFontSize: 14, dataLabelFontFace: BODY_FONT,
      dataLabelFormatCode: '+0"M";-0"M"',
      showLegend: false, showTitle: true,
      title: "Projected global job creation & displacement by 2030 (millions)",
      titleColor: GRAY, titleFontSize: 12, titleFontFace: BODY_FONT,
      ...quietCat, ...quietVal,
    });
    const pts = [
      ["users", "22% of today's jobs", "will be structurally transformed by 2030 — churn is the real story beneath the net gain."],
      ["gear", "41% of employers plan cuts", "where AI automates tasks — but nearly half plan to transition staff into growing roles instead."],
      ["seed", "Growth on both ends", "Fastest-growing roles: big-data & AI/ML specialists, software developers — plus care, education, agriculture, delivery."],
    ];
    let fy = 2.05;
    for (const [key, h, b] of pts) {
      circleIcon(s, key, 7.95, fy, 0.5);
      s.addText(h, { x: 8.63, y: fy - 0.06, w: 4.1, h: 0.35, fontFace: BODY_FONT, fontSize: 14.5, bold: true, color: NAVY, margin: 0 });
      s.addText(b, { x: 8.63, y: fy + 0.3, w: 4.1, h: 1.0, fontFace: BODY_FONT, fontSize: 12, color: INK, margin: 0, lineSpacing: 15 });
      fy += 1.48;
    }
    s.addText("Source: WEF Future of Jobs Report 2025 — 1,000+ employers, 55 economies, 14M+ workers represented.", {
      x: 0.6, y: 6.5, w: 12, h: 0.3, fontFace: BODY_FONT, fontSize: 9.5, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 6);
  }

  // =========================================================== Slide 7 — two-track market
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "The future workforce");
    slideTitle(s, "A two-track labor market is emerging");
    // Track 1
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 1.8, w: 6.0, h: 3.9, fill: { color: "EDF5EE" }, rectRadius: 0.08 });
    s.addText("TRACK 1 — PROFESSIONALISED BY AI", {
      x: 0.95, y: 2.05, w: 5.4, h: 0.35, fontFace: BODY_FONT, fontSize: 13, bold: true, color: GREEN, charSpacing: 2, margin: 0,
    });
    const t1 = [
      ["+35%", "growth in 'seniorised' AI-exposed entry roles since 2019 — judgment and ownership expected on day one"],
      ["2×", "faster job growth than AI-'democratised' roles; wages growing 42% faster since 2021"],
      ["2.5×", "more reliance on empathy, judgment & creativity in newly added tasks"],
    ];
    let ty = 2.5;
    for (const [n, t] of t1) {
      s.addText(n, { x: 0.95, y: ty, w: 1.15, h: 0.55, fontFace: TITLE_FONT, fontSize: 21, bold: true, color: GREEN, margin: 0 });
      s.addText(t, { x: 2.15, y: ty + 0.03, w: 4.2, h: 0.95, fontFace: BODY_FONT, fontSize: 11.5, color: INK, margin: 0, lineSpacing: 14 });
      ty += 1.02;
    }
    // Track 2
    s.addShape(pres.ShapeType.roundRect, { x: 6.75, y: 1.8, w: 6.0, h: 3.9, fill: { color: "F9EEED" }, rectRadius: 0.08 });
    s.addText("TRACK 2 — ROUTINE & ENTRY-LEVEL EXECUTION", {
      x: 7.1, y: 2.05, w: 5.4, h: 0.35, fontFace: BODY_FONT, fontSize: 13, bold: true, color: RED, charSpacing: 2, margin: 0,
    });
    const t2 = [
      ["−20%", "employment for software developers aged 22–25 in one year (2024→2025)"],
      ["−13%", "postings for structured, repetitive cognitive roles since ChatGPT's launch"],
      ["−10%", "decline in entry-level roles that have not been redesigned since 2019"],
    ];
    ty = 2.5;
    for (const [n, t] of t2) {
      s.addText(n, { x: 7.1, y: ty, w: 1.25, h: 0.55, fontFace: TITLE_FONT, fontSize: 21, bold: true, color: RED, margin: 0 });
      s.addText(t, { x: 8.4, y: ty + 0.03, w: 4.1, h: 0.95, fontFace: BODY_FONT, fontSize: 11.5, color: INK, margin: 0, lineSpacing: 14 });
      ty += 1.02;
    }
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 5.9, w: 12.15, h: 0.85, fill: { color: NAVY }, rectRadius: 0.08 });
    s.addText([
      { text: "The first rung of the career ladder is being redesigned in real time. ", options: { bold: true, color: WHITE } },
      { text: "Security accrues to those who direct and verify AI — not those who compete with it at routine execution.", options: { color: ICE } },
    ], { x: 0.95, y: 6.0, w: 11.5, h: 0.65, fontFace: BODY_FONT, fontSize: 13.5, margin: 0, valign: "middle" });
    pageFoot(s, 7);
  }

  // =========================================================== Slide 8 — wage premium
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "The future workforce");
    slideTitle(s, "The market is repricing AI skills — fast");
    s.addChart(pres.ChartType.bar, [{
      name: "Wage premium",
      labels: ["2024 report", "2025 report", "2026 report"],
      values: [25, 56, 62],
    }], {
      x: 0.6, y: 1.85, w: 6.6, h: 4.3, barDir: "col", barGapWidthPct: 70,
      chartColors: [LTBLUE, MIDBLUE, NAVY],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: NAVY,
      dataLabelFontBold: true, dataLabelFontSize: 15, dataLabelFontFace: BODY_FONT,
      dataLabelFormatCode: '0"%"',
      showLegend: false, showTitle: true,
      title: "Wage premium for jobs requiring AI skills (PwC AI Jobs Barometer)",
      titleColor: GRAY, titleFontSize: 12, titleFontFace: BODY_FONT,
      ...quietCat, ...quietVal, valAxisMaxVal: 70,
    });
    const stats = [
      ["118%", "premium in consumer-markets roles — the highest-paying sector for AI skills"],
      ["+69% vs +9%", "growth in AI-skill postings vs. the total job market — nearly 8× faster"],
      ["Falling degrees", "degree requirements are dropping fastest in AI-augmented jobs — skills-based hiring is winning"],
    ];
    let sy = 2.05;
    for (const [n, t] of stats) {
      s.addShape(pres.ShapeType.roundRect, { x: 7.55, y: sy, w: 5.18, h: 1.28, fill: { color: CARD }, rectRadius: 0.07 });
      s.addText(n, { x: 7.85, y: sy + 0.14, w: 4.6, h: 0.45, fontFace: TITLE_FONT, fontSize: 19, bold: true, color: GOLD === "D89A2B" ? NAVY : NAVY, margin: 0 });
      s.addText(t, { x: 7.85, y: sy + 0.6, w: 4.6, h: 0.6, fontFace: BODY_FONT, fontSize: 11.5, color: INK, margin: 0, lineSpacing: 14 });
      sy += 1.45;
    }
    s.addText("Employer signal: 66% of leaders would not hire without AI skills; 71% prefer a less-experienced candidate with them. (Microsoft/LinkedIn)", {
      x: 0.6, y: 6.4, w: 12.1, h: 0.35, fontFace: BODY_FONT, fontSize: 11, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 8);
  }

  // =========================================================== Slide 9 — skills gaining/losing
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Skills analysis");
    slideTitle(s, "Which skills are gaining — and losing — value");
    s.addChart(pres.ChartType.bar, [{
      name: "Projected change",
      labels: ["Data scientists", "Info-security analysts", "Software developers",
               "Cashiers", "Data entry keyers", "Switchboard operators", "Word processors & typists"],
      values: [33.5, 28.5, 15.8, -9.9, -25.9, -26.3, -36.1],
    }], {
      x: 0.6, y: 1.8, w: 7.4, h: 4.55, barDir: "bar", barGapWidthPct: 45,
      chartColors: [GREEN, GREEN, GREEN, RED, RED, RED, RED],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: INK,
      dataLabelFontBold: true, dataLabelFontSize: 11, dataLabelFontFace: BODY_FONT,
      dataLabelFormatCode: '+0.#"%";-0.#"%"',
      showLegend: false, showTitle: true,
      title: "U.S. employment change, 2024–2034 projections (BLS)",
      titleColor: GRAY, titleFontSize: 12, titleFontFace: BODY_FONT,
      catAxisLabelFontSize: 10.5, catAxisLabelColor: INK, catAxisLabelFontFace: BODY_FONT,
      catGridLine: { style: "none" }, ...quietVal, valAxisHidden: true,
    });
    s.addShape(pres.ShapeType.roundRect, { x: 8.3, y: 1.85, w: 4.43, h: 2.1, fill: { color: "EDF5EE" }, rectRadius: 0.07 });
    s.addText("Rising with pay to match", {
      x: 8.6, y: 2.0, w: 3.9, h: 0.35, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: GREEN, margin: 0,
    });
    s.addText("Median wages: CIS researchers $140,910 · info-security $124,910 · data scientists $112,590. LinkedIn: AI literacy is the #1 U.S. skill on the rise — member AI skills +177% in 12 months.", {
      x: 8.6, y: 2.38, w: 3.9, h: 1.5, fontFace: BODY_FONT, fontSize: 11, color: INK, margin: 0, lineSpacing: 14 });
    s.addShape(pres.ShapeType.roundRect, { x: 8.3, y: 4.15, w: 4.43, h: 2.2, fill: { color: "F9EEED" }, rectRadius: 0.07 });
    s.addText("What is actually declining", {
      x: 8.6, y: 4.3, w: 3.9, h: 0.35, fontFace: BODY_FONT, fontSize: 13.5, bold: true, color: RED, margin: 0,
    });
    s.addText("Not 'human skills' — routine execution: standardized typing, data entry, information routing, low-discretion transaction handling, boilerplate coding as a standalone moat.", {
      x: 8.6, y: 4.68, w: 3.9, h: 1.55, fontFace: BODY_FONT, fontSize: 11, color: INK, margin: 0, lineSpacing: 14 });
    s.addText("Sources: U.S. Bureau of Labor Statistics (2024–34 projections, 2024 median wages); LinkedIn Skills on the Rise 2026.", {
      x: 0.6, y: 6.5, w: 12, h: 0.3, fontFace: BODY_FONT, fontSize: 9.5, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 9);
  }

  // =========================================================== Slide 10 — AI literacy & education
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "AI literacy & education");
    slideTitle(s, "Learners are ahead of institutions");
    const rows = [
      ["grad", "Students have moved", "4 in 5 U.S. high-school & college students use AI for schoolwork — but only half of secondary schools have AI policies, and just 6% of teachers call them clear."],
      ["teach", "Teachers see the dividend", "60% of U.S. K-12 teachers used AI in 2024–25; weekly users save ~5.9 hours per week (≈ six weeks a year) — yet only 18% received formal guidance."],
      ["landmark", "Policy is scaffolding up", "EO 14277 on AI education (Apr 2025); DOL AI Literacy Framework & WIOA funding; 35 states + Puerto Rico with official K-12 AI guidance; Ohio mandates district AI policies by Jul 2026."],
      ["book", "A global curriculum exists", "UNESCO's AI competency frameworks for students & teachers (2024) structure literacy across understand → apply → create: mindset, ethics, techniques, system design."],
    ];
    let ry = 1.9;
    for (const [key, h, b] of rows) {
      s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: ry - 0.12, w: 12.13, h: 1.12, fill: { color: CARD }, rectRadius: 0.07 });
      circleIcon(s, key, 0.88, ry + 0.02, 0.6);
      s.addText(h, { x: 1.72, y: ry - 0.02, w: 3.1, h: 0.9, fontFace: BODY_FONT, fontSize: 14.5, bold: true, color: NAVY, margin: 0, valign: "middle" });
      s.addText(b, { x: 4.9, y: ry - 0.05, w: 7.6, h: 1.0, fontFace: BODY_FONT, fontSize: 11.5, color: INK, margin: 0, lineSpacing: 14, valign: "middle" });
      ry += 1.24;
    }
    s.addText([
      { text: "AI literacy turns trillion-dollar projections into raises, careers, and first jobs.  ", options: { bold: true, color: NAVY } },
      { text: "Sources: AI Index 2026; Gallup; DOL; NASBE; UNESCO", options: { italic: true, color: GRAY, fontSize: 9.5 } },
    ], { x: 0.6, y: 6.62, w: 12.1, h: 0.35, fontFace: BODY_FONT, fontSize: 12.5, margin: 0 });
    pageFoot(s, 10);
  }

  // =========================================================== Slide 11 — KSA/OKR/KPI
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "AI-job readiness");
    slideTitle(s, "Manage AI readiness: KSA → OKR → KPI");
    const cols = [
      { h: "KSA — the person", c: "E9F1FC", hc: NAVY, items: [
        ["Knowledge", "AI fundamentals · data literacy · ethics, governance & regulation · domain expertise"],
        ["Skills", "prompting & tool orchestration · output verification · data analysis · workflow redesign"],
        ["Abilities", "judgment · critical thinking · adaptability · communication & collaboration"]] },
      { h: "OKR — the program", c: "EDF5EE", hc: GREEN, items: [
        ["Objective", "an AI-ready workforce capturing measurable value within 12 months"],
        ["KR1–KR2", "90% complete role-based AI-literacy training · 60% weekly active use of approved tools"],
        ["KR3", "75% of workers in automated task areas redeployed into augmented roles"]] },
      { h: "KPI — the measurement", c: "FBF3E4", hc: "A6791F", items: [
        ["Adoption", "literacy certification rate · weekly active-use rate"],
        ["Value", "productivity delta per augmented role · time-to-proficiency"],
        ["People", "internal redeployment rate · wage progression of reskilled workers"]] },
    ];
    const cw2 = 3.95, gap2 = 0.14;
    cols.forEach((col, i) => {
      const x = 0.6 + i * (cw2 + gap2);
      s.addShape(pres.ShapeType.roundRect, { x, y: 1.8, w: cw2, h: 4.05, fill: { color: col.c }, rectRadius: 0.08 });
      s.addText(col.h, { x: x + 0.25, y: 2.0, w: cw2 - 0.5, h: 0.4, fontFace: TITLE_FONT, fontSize: 16.5, bold: true, color: col.hc, margin: 0 });
      let iy = 2.55;
      for (const [t, b] of col.items) {
        s.addText(t, { x: x + 0.25, y: iy, w: cw2 - 0.5, h: 0.3, fontFace: BODY_FONT, fontSize: 12.5, bold: true, color: NAVY, margin: 0 });
        s.addText(b, { x: x + 0.25, y: iy + 0.3, w: cw2 - 0.5, h: 0.75, fontFace: BODY_FONT, fontSize: 10.5, color: INK, margin: 0, lineSpacing: 13 });
        iy += 1.1;
      }
      if (i < 2) {
        s.addText("→", { x: x + cw2 - 0.08, y: 3.55, w: 0.36, h: 0.5, fontFace: BODY_FONT, fontSize: 24, bold: true, color: NAVY, align: "center", margin: 0 });
      }
    });
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 6.05, w: 12.13, h: 0.75, fill: { color: NAVY }, rectRadius: 0.08 });
    s.addText([
      { text: "Closed loop: ", options: { bold: true, color: GOLD } },
      { text: "KPI results feed the next KSA gap analysis and OKR cycle — re-baselined against live skills-demand data, because skills in AI-exposed jobs change 66% faster.", options: { color: WHITE } },
    ], { x: 0.95, y: 6.12, w: 11.5, h: 0.6, fontFace: BODY_FONT, fontSize: 12.5, margin: 0, valign: "middle" });
    pageFoot(s, 11);
  }

  // =========================================================== Slide 12 — last 60 days
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Recent trends — the last 60 days");
    slideTitle(s, "Sixty days that raised the stakes");
    const events = [
      ["JUN 2", "EO 14409: U.S. AI-cybersecurity clearinghouse for federal & critical-infrastructure defense"],
      ["JUN 8", "Apple ships next-gen Apple Intelligence & Siri AI — AI becomes default OS behavior"],
      ["JUN 10", "EU publishes Code of Practice for marking & labelling AI-generated content"],
      ["JUL 8", "IMF: growth cut to 3.0%; record energy shock (oil +32%) vs. an AI investment supercycle"],
      ["JUL 13", "200+ economists, incl. 16 Nobel laureates, warn: prepare for AI's economic impact now"],
      ["JUL 14", "NY launches first statewide hyperscale data-center moratorium; GOLD EAGLE cyber program"],
      ["JUL 16", "29 countries sign on to a China-backed World AI Cooperation Organization"],
      ["AUG 2", "EU AI Act high-risk regime becomes enforceable — fines up to €35M / 7% of revenue"],
    ];
    // timeline spine
    s.addShape(pres.ShapeType.line, { x: 2.05, y: 1.95, w: 0, h: 4.55, line: { color: LTBLUE, width: 2.5 } });
    let ey = 1.85;
    for (const [d, t] of events) {
      s.addShape(pres.ShapeType.ellipse, { x: 1.955, y: ey + 0.09, w: 0.19, h: 0.19, fill: { color: d === "AUG 2" ? GOLD : NAVY } });
      s.addText(d, { x: 0.6, y: ey, w: 1.25, h: 0.38, fontFace: BODY_FONT, fontSize: 12.5, bold: true, color: d === "AUG 2" ? "A6791F" : NAVY, align: "right", margin: 0 });
      s.addText(t, { x: 2.45, y: ey, w: 10.25, h: 0.5, fontFace: BODY_FONT, fontSize: 12.5, color: INK, margin: 0 });
      ey += 0.585;
    }
    s.addText("Sources: White House; Apple; European Commission; IMF WEO Update (Jul 8, 2026); Stanford Digital Economy Lab; NY Governor's office; Reuters.", {
      x: 0.6, y: 6.65, w: 12.1, h: 0.3, fontFace: BODY_FONT, fontSize: 9.5, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 12);
  }

  // =========================================================== Slide 13 — everyday life ranking
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Recent trends — the last 60 days");
    slideTitle(s, "What will households feel first");
    const ranks = [
      ["plug", "1", "Energy prices & inflation", "The record oil shock (+32%) passes through to fuel, heating, and food within months — and raises the cost of the power-hungry AI build-out itself."],
      ["gear", "2", "The entry-level squeeze", "A ~20% one-year employment drop for the youngest software developers changes the first rung of the career ladder now — not in 2030."],
      ["mobile", "3", "AI embedded by default", "Siri AI and next-gen assistants make search, drafting, scheduling, and messaging AI-mediated out of the box on mainstream devices."],
      ["tag", "4", "Labeled AI content & new rights", "EU AI Act enforcement plus content-labelling rules bring visible AI labels and recourse on automated decisions — a template likely to spread."],
    ];
    let ry = 1.95;
    for (const [key, n, h, b] of ranks) {
      s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: ry - 0.1, w: 12.13, h: 1.06, fill: { color: ry < 3 ? CARD : CARD }, rectRadius: 0.07 });
      s.addText(n, { x: 0.85, y: ry - 0.02, w: 0.75, h: 0.9, fontFace: TITLE_FONT, fontSize: 34, bold: true, color: GOLD, margin: 0, valign: "middle" });
      circleIcon(s, key, 1.7, ry + 0.12, 0.58);
      s.addText(h, { x: 2.55, y: ry - 0.02, w: 3.2, h: 0.9, fontFace: BODY_FONT, fontSize: 14.5, bold: true, color: NAVY, margin: 0, valign: "middle" });
      s.addText(b, { x: 5.85, y: ry - 0.04, w: 6.65, h: 0.95, fontFace: BODY_FONT, fontSize: 11.5, color: INK, margin: 0, lineSpacing: 14, valign: "middle" });
      ry += 1.18;
    }
    s.addText("AI is no longer only a software story — it is an energy, land-use, and community story too (data-center protests in 125+ U.S. locations).", {
      x: 0.6, y: 6.7, w: 12.1, h: 0.35, fontFace: BODY_FONT, fontSize: 11.5, italic: true, color: GRAY, margin: 0,
    });
    pageFoot(s, 13);
  }

  // =========================================================== Slide 14 — recommendations
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    kicker(s, "Recommendations");
    slideTitle(s, "What each stakeholder should do now");
    const cols = [
      { icon: "landmark", h: "Policymakers", items: [
        "Make AI literacy foundational — on par with reading and numeracy (UNESCO frameworks as scaffolding)",
        "Fund teacher professional development first — frameworks without trained teachers are unfunded mandates",
        "Aim WIOA machinery at adults and displaced workers, with KSA-based eligibility and KPI accountability",
        "Build first-job pathways — apprenticeships targeted at the entry-level squeeze"] },
      { icon: "brief", h: "Employers", items: [
        "Hire for skills — degree signals are weakening fastest in transformed roles",
        "Run readiness as a managed program (KSA → OKR → KPI), not ad-hoc training",
        "Train the least experienced first — that is where measured gains are largest (+34%)",
        "Redesign entry roles rather than cutting them; treat EU AI Act (Aug 2) as a program deadline"] },
      { icon: "gear", h: "Workers & students", items: [
        "Build demonstrable AI fluency in your own domain — where the 62% premium attaches",
        "Cultivate what AI can't supply: judgment, verification, communication, domain depth",
        "Expect continuous reskilling — 39% of today's skills change by 2030",
        "Early-career: target 'seniorised' roles — show ownership and AI leverage, not task throughput"] },
    ];
    const cw3 = 3.95, gap3 = 0.14;
    cols.forEach((col, i) => {
      const x = 0.6 + i * (cw3 + gap3);
      s.addShape(pres.ShapeType.roundRect, { x, y: 1.8, w: cw3, h: 4.75, fill: { color: CARD }, rectRadius: 0.08 });
      circleIcon(s, col.icon, x + 0.25, 2.02, 0.55);
      s.addText(col.h, { x: x + 0.95, y: 2.02, w: cw3 - 1.2, h: 0.55, fontFace: TITLE_FONT, fontSize: 17, bold: true, color: NAVY, margin: 0, valign: "middle" });
      s.addText(col.items.map((t, j) => ({
        text: t, options: { bullet: { code: "2022", indent: 12 }, breakLine: j < col.items.length - 1, paraSpaceAfter: 8 },
      })), { x: x + 0.28, y: 2.75, w: cw3 - 0.55, h: 3.6, fontFace: BODY_FONT, fontSize: 11, color: INK, margin: 0, lineSpacing: 13.5 });
    });
    pageFoot(s, 14);
  }

  // =========================================================== Slide 15 — closing
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addText("THE BOTTOM LINE", {
      x: 0.75, y: 1.35, w: 8, h: 0.35, fontFace: BODY_FONT, fontSize: 13, color: GOLD, bold: true, charSpacing: 3, margin: 0,
    });
    s.addText("AI is neither a job destroyer nor an\nautomatic prosperity machine.", {
      x: 0.75, y: 1.8, w: 11.8, h: 1.6, fontFace: TITLE_FONT, fontSize: 34, bold: true, color: WHITE, margin: 0, lineSpacing: 42,
    });
    s.addText("It is a force multiplier whose outcomes depend on literacy, work redesign, governance, and measurement discipline. The aggregate benefits are real; their distribution is decided in classrooms, training programs, and hiring policies.", {
      x: 0.75, y: 3.5, w: 10.8, h: 1.0, fontFace: BODY_FONT, fontSize: 15.5, color: ICE, margin: 0, lineSpacing: 21,
    });
    // formula
    const parts = ["AI literacy", "+", "domain expertise", "+", "judgment"];
    let fx = 0.75;
    const widths = [2.5, 0.55, 3.2, 0.55, 2.2];
    parts.forEach((p, i) => {
      if (p === "+") {
        s.addText("+", { x: fx, y: 4.85, w: widths[i], h: 0.85, fontFace: TITLE_FONT, fontSize: 28, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
      } else {
        s.addShape(pres.ShapeType.roundRect, { x: fx, y: 4.85, w: widths[i], h: 0.85, fill: { color: NAVY2 }, line: { color: GOLD, width: 1.25 }, rectRadius: 0.1 });
        s.addText(p, { x: fx, y: 4.85, w: widths[i], h: 0.85, fontFace: TITLE_FONT, fontSize: 19, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
      }
      fx += widths[i] + 0.12;
    });
    s.addText("= the winning formula for pay and job security in the AI economy", {
      x: 0.75, y: 5.85, w: 11.5, h: 0.45, fontFace: BODY_FONT, fontSize: 15, italic: true, color: ICE, margin: 0,
    });
    s.addText([
      { text: "Ronnie Gladney", options: { bold: true, color: WHITE } },
      { text: "  ·  AI Consultant  ·  rongladney@gmail.com  ·  Full papers: Markdown & PDF with 30+ cited sources", options: { color: LTBLUE } },
    ], { x: 0.75, y: 6.75, w: 12.0, h: 0.4, fontFace: BODY_FONT, fontSize: 12, margin: 0 });
  }

  await pres.writeFile({ fileName: "/home/user/pipeline-presentation/AI_Impact_Presentation.pptx" });
  console.log("Deck written.");
})();
