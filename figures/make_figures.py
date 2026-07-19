"""Generate figures for 'The Impact of Artificial Intelligence on Society and
the Economic Benefits for the Future Workforce'.

Data sources are cited in the paper's References section; each figure notes
its source. Palette follows a CVD-validated light-mode chart palette.
"""
import matplotlib.pyplot as plt
import matplotlib as mpl

# Palette (validated light-mode slots + chrome)
BLUE = "#2a78d6"
BLUE_DARK = "#1c5cab"
BLUE_LIGHT = "#86b6ef"
BLUE_MID = "#5598e7"
RED = "#e34948"
GREEN = "#008300"
INK = "#0b0b0b"
INK2 = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
BASE = "#c3c2b7"
SURFACE = "#fcfcfb"

mpl.rcParams.update({
    "figure.facecolor": SURFACE,
    "axes.facecolor": SURFACE,
    "savefig.facecolor": SURFACE,
    "font.family": "DejaVu Sans",
    "text.color": INK,
    "axes.edgecolor": BASE,
    "axes.labelcolor": INK2,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "axes.titlecolor": INK,
    "font.size": 11,
    "axes.titlesize": 13,
    "axes.titleweight": "bold",
    "axes.spines.top": False,
    "axes.spines.right": False,
    "figure.dpi": 150,
    "savefig.dpi": 200,
    "savefig.bbox": "tight",
    "savefig.pad_inches": 0.25,
})


def style_ax(ax, xgrid=False, ygrid=True):
    ax.grid(axis="y" if ygrid and not xgrid else "x", color=GRID, linewidth=0.8, zorder=0)
    ax.set_axisbelow(True)
    ax.tick_params(length=0)


def footnote(fig, text):
    fig.text(0.01, -0.02, text, fontsize=8, color=MUTED, ha="left")


# ---------------------------------------------------------------- Figure 1
# Global corporate AI investment and private investment by geography
# (Stanford AI Index 2025 & 2026)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9.5, 4.0))
bars = ax1.bar(["2024", "2025"], [252.3, 581.7],
               color=[BLUE_LIGHT, BLUE], width=0.5, zorder=3)
for b, v in zip(bars, [252.3, 581.7]):
    ax1.text(b.get_x() + b.get_width() / 2, v + 12, f"${v:.1f}B",
             ha="center", fontsize=12, color=INK, fontweight="bold")
ax1.set_ylim(0, 680)
ax1.set_title("Global corporate AI investment", loc="left", fontsize=11.5)
ax1.set_ylabel("USD billions")
style_ax(ax1)

countries = ["United Kingdom", "China", "United States"]
vals = [7.4, 12.4, 285.9]
labels_txt = ["$7.4B", "$12.4B", "$285.9B"]
bars = ax2.barh(countries, vals, color=[BLUE_LIGHT, BLUE_MID, BLUE],
                height=0.5, zorder=3)
for b, t, v in zip(bars, labels_txt, vals):
    ax2.text(v + 6, b.get_y() + b.get_height() / 2, t,
             va="center", ha="left", fontsize=11, color=INK, fontweight="bold")
ax2.set_xlim(0, 340)
ax2.set_title("Private AI investment by geography, 2025", loc="left", fontsize=11.5)
ax2.set_xlabel("USD billions")
style_ax(ax2, xgrid=True, ygrid=False)
ax2.tick_params(axis="y", colors=INK2)
fig.tight_layout()
footnote(fig, "Source: Stanford HAI, AI Index Reports 2025 & 2026. U.S. private AI investment in 2025 was ~23× China's tracked total.")
fig.savefig("fig1_investment.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 2
# Organizational AI adoption (McKinsey Global Survey, via AI Index 2025)
fig, ax = plt.subplots(figsize=(8, 4.2))
years = [2017, 2022, 2023, 2024]
adoption = [20, 50, 55, 78]
ax.plot(years, adoption, color=BLUE, linewidth=2, marker="o", markersize=8,
        markerfacecolor=BLUE, markeredgecolor=SURFACE, markeredgewidth=2, zorder=3)
for x, y in zip(years, adoption):
    ax.annotate(f"{y}%", (x, y), textcoords="offset points", xytext=(0, 12),
                ha="center", fontsize=11, color=INK, fontweight="bold")
ax.set_ylim(0, 95)
ax.set_xticks(years)
ax.set_title("Organizations using AI in at least one business function", loc="left", pad=14)
ax.set_ylabel("Share of organizations (%)")
style_ax(ax)
footnote(fig, "Source: McKinsey Global Survey on AI, as reported in Stanford HAI AI Index Report 2025.")
fig.savefig("fig2_adoption.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 3
# WEF Future of Jobs 2025: structural labor-market change by 2030
fig, ax = plt.subplots(figsize=(8, 4.4))
labels = ["New roles created", "Roles displaced", "Net change"]
vals = [170, -92, 78]
colors = [BLUE, RED, BLUE_LIGHT]
bars = ax.bar(labels, vals, color=colors, width=0.55, zorder=3)
for b, v in zip(bars, vals):
    off = 5 if v > 0 else -13
    ax.text(b.get_x() + b.get_width() / 2, v + off, f"{v:+d}M",
            ha="center", fontsize=12, color=INK, fontweight="bold")
ax.axhline(0, color=BASE, linewidth=1)
ax.set_ylim(-130, 205)
ax.set_title("Projected global job creation and displacement by 2030", loc="left", pad=14)
ax.set_ylabel("Jobs (millions)")
style_ax(ax)
footnote(fig, "Source: World Economic Forum, Future of Jobs Report 2025 (survey of 1,000+ employers, 55 economies).")
fig.savefig("fig3_jobs.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 4
# Estimates of AI's macroeconomic impact
fig, ax = plt.subplots(figsize=(8, 4.4))
labels = ["PwC\n(added to global GDP\nby 2030)",
          "Goldman Sachs\n(global GDP lift\nover a decade)",
          "McKinsey\n(annual value from\ngenerative AI)"]
vals = [15.7, 7.0, 3.5]
err_low = [0, 0, 3.5 - 2.6]
err_high = [0, 0, 4.4 - 3.5]
bars = ax.bar(labels, vals, color=[BLUE, BLUE_MID, BLUE_LIGHT], width=0.5, zorder=3)
ax.errorbar([2], [3.5], yerr=[[err_low[2]], [err_high[2]]], fmt="none",
            ecolor=INK2, elinewidth=1.5, capsize=5, zorder=4)
ann = ["$15.7T", "$7T", "$2.6–4.4T"]
for b, a in zip(bars, ann):
    ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 0.6, a,
            ha="center", fontsize=12, color=INK, fontweight="bold")
ax.set_ylim(0, 18.5)
ax.set_title("Estimates of AI's economic impact (USD trillions)", loc="left", pad=14)
ax.set_ylabel("USD trillions")
style_ax(ax)
ax.tick_params(axis="x", labelsize=9.5)
fig.text(0.01, -0.12, "Sources: PwC (2017); Goldman Sachs (2023); McKinsey (2023). Time bases differ — noted under each bar.",
         fontsize=8, color=MUTED, ha="left")
fig.savefig("fig4_economic_impact.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 5
# PwC AI Jobs Barometer: wage premium and productivity growth
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 4.2))
# Wage premium
bars = ax1.bar(["2024\nreport", "2025\nreport", "2026\nreport"], [25, 56, 62],
               color=[BLUE_LIGHT, BLUE_MID, BLUE], width=0.55, zorder=3)
for b, v in zip(bars, [25, 56, 62]):
    ax1.text(b.get_x() + b.get_width() / 2, v + 1.5, f"{v}%",
             ha="center", fontsize=12, color=INK, fontweight="bold")
ax1.set_ylim(0, 72)
ax1.set_title("Wage premium for jobs\nrequiring AI skills", loc="left", fontsize=11.5)
ax1.set_ylabel("Premium vs. comparable roles (%)")
style_ax(ax1)
# Productivity growth
bars = ax2.bar(["2018–2022", "2018–2024"], [7, 27],
               color=[BLUE_LIGHT, BLUE], width=0.5, zorder=3)
for b, v in zip(bars, [7, 27]):
    ax2.text(b.get_x() + b.get_width() / 2, v + 0.8, f"{v}%",
             ha="center", fontsize=12, color=INK, fontweight="bold")
ax2.set_ylim(0, 32)
ax2.set_title("Productivity growth in industries\nmost exposed to AI", loc="left", fontsize=11.5)
ax2.set_ylabel("Cumulative growth (%)")
style_ax(ax2)
fig.suptitle("PwC Global AI Jobs Barometer", x=0.01, ha="left", fontsize=13, fontweight="bold")
fig.tight_layout(rect=[0, 0, 1, 0.93])
footnote(fig, "Source: PwC Global AI Jobs Barometer, 2025 and 2026 editions (analysis of ~1 billion job ads).")
fig.savefig("fig5_barometer.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 6
# Measured productivity gains from generative AI (field/lab studies)
fig, ax = plt.subplots(figsize=(8.5, 4.2))
studies = ["Software coding speed\n(Peng et al., 2023)",
           "Business-writing speed\n(Noy & Zhang, 2023)",
           "Novice support agents\n(Brynjolfsson et al., 2023)",
           "Customer support overall\n(Brynjolfsson et al., 2023)"]
gains = [55.8, 40, 34, 14]
bars = ax.barh(studies, gains, color=BLUE, height=0.55, zorder=3)
for b, v in zip(bars, gains):
    ax.text(v + 1, b.get_y() + b.get_height() / 2, f"+{v:g}%",
            va="center", fontsize=11, color=INK, fontweight="bold")
ax.set_xlim(0, 64)
ax.set_title("Measured productivity gains from generative AI assistance", loc="left", pad=14)
ax.set_xlabel("Improvement (%)")
style_ax(ax, xgrid=True, ygrid=False)
ax.tick_params(axis="y", labelsize=9.5, colors=INK2)
footnote(fig, "Sources: Peng et al. (2023); Noy & Zhang (2023, Science); Brynjolfsson, Li & Raymond (2023, NBER).")
fig.savefig("fig6_productivity_studies.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 7
# AI literacy and skills-demand indicators
fig, ax = plt.subplots(figsize=(8.5, 4.6))
items = ["Skills expected to change or\nbecome outdated, 2025–2030 (WEF)",
         "Leaders who would not hire someone\nwithout AI skills (Microsoft/LinkedIn)",
         "Leaders preferring less-experienced\ncandidates with AI skills (Microsoft/LinkedIn)",
         "Organizations using AI in at least\none function, 2024 (McKinsey)",
         "U.S. students using AI for\nschoolwork (Stanford AI Index)",
         "Employers expecting rising demand\nfor AI & big-data skills (WEF)"]
vals = [39, 66, 71, 78, 80, 90]
bars = ax.barh(items, vals, color=BLUE, height=0.55, zorder=3)
for b, v in zip(bars, vals):
    ax.text(v + 1.2, b.get_y() + b.get_height() / 2, f"{v}%",
            va="center", fontsize=11, color=INK, fontweight="bold")
ax.set_xlim(0, 100)
ax.set_title("AI literacy and skills-demand indicators", loc="left", pad=14)
ax.set_xlabel("Share of respondents (%)")
style_ax(ax, xgrid=True, ygrid=False)
ax.tick_params(axis="y", labelsize=9, colors=INK2)
footnote(fig, "Sources: WEF Future of Jobs Report 2025; Microsoft & LinkedIn Work Trend Index 2024; Stanford HAI AI Index; McKinsey.")
fig.savefig("fig7_literacy_indicators.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 8
# Rising vs. declining: growth in demand by job/skill segment
fig, ax = plt.subplots(figsize=(9, 4.8))
items = ["Software developers aged 22–25,\n2024–2025 (AI Index 2026)",
         "Structured, repetitive cognitive roles\nsince ChatGPT launch (HBS)",
         "Entry-level roles other than 'seniorised',\n2019–2025 (PwC)",
         "Total job market, latest year (PwC)",
         "Analytical, creative & leadership-intensive\nroles since ChatGPT launch (HBS)",
         "'Seniorised' AI-exposed entry-level roles,\n2019–2025 (PwC)",
         "Job postings requiring AI skills,\nlatest year (PwC)"]
vals = [-20, -13, -10, 9, 20, 35, 69]
colors = [RED if v < 0 else BLUE for v in vals]
bars = ax.barh(items, vals, color=colors, height=0.55, zorder=3)
for b, v in zip(bars, vals):
    off = 1.5 if v > 0 else -1.5
    ax.text(v + off, b.get_y() + b.get_height() / 2, f"{v:+d}%",
            va="center", ha="left" if v > 0 else "right",
            fontsize=11, color=INK, fontweight="bold")
ax.axvline(0, color=BASE, linewidth=1)
ax.set_xlim(-32, 82)
ax.set_title("Rising and declining demand across the AI-era labor market", loc="left", pad=14)
ax.set_xlabel("Change in employment or postings (%)")
style_ax(ax, xgrid=True, ygrid=False)
ax.tick_params(axis="y", labelsize=9, colors=INK2)
footnote(fig, "Sources: Stanford HAI AI Index 2026; Harvard Business School job-postings study; PwC Global AI Jobs Barometer 2026.")
fig.savefig("fig8_skills_shift.png")
plt.close(fig)

# ---------------------------------------------------------------- Figure 9
# KSA -> OKR -> KPI workforce-development framework diagram
fig, ax = plt.subplots(figsize=(10, 6.4))
ax.set_xlim(-0.05, 10.15)
ax.set_ylim(0, 10)
ax.axis("off")

def box(x, y, w, h, title, lines, face, edge):
    ax.add_patch(mpl.patches.FancyBboxPatch(
        (x, y), w, h, boxstyle="round,pad=0.10,rounding_size=0.12",
        facecolor=face, edgecolor=edge, linewidth=1.2, zorder=2))
    ax.text(x + w / 2, y + h - 0.28, title, ha="center", va="top",
            fontsize=11, fontweight="bold", color=INK)
    ax.text(x + w / 2, y + h - 1.15, lines, ha="center", va="top",
            fontsize=7.8, color=INK2, linespacing=1.45)

box(0.15, 2.9, 3.0, 6.7, "KSA — the person",
    "Knowledge\nAI fundamentals - data literacy\nethics & governance - domain expertise\n\n"
    "Skills\nprompting & tool orchestration\noutput verification - data analysis\nAI-augmented workflow design\n\n"
    "Abilities\njudgment - critical thinking\nadaptability - collaboration",
    "#e9f1fc", BLUE)
box(3.55, 2.9, 3.0, 6.7, "OKR — the program",
    "Objective\nan AI-ready workforce\nwithin 12 months\n\n"
    "KR1  90% of staff complete\nrole-based AI literacy training\n\n"
    "KR2  60% weekly active use\nof approved AI tools\n\n"
    "KR3  75% of workers in automated\ntasks redeployed to augmented roles",
    "#eef7ee", GREEN)
box(6.95, 2.9, 3.0, 6.7, "KPI — the measurement",
    "AI-literacy certification rate\n\nweekly active AI-tool usage\n\n"
    "productivity delta per\naugmented role\n\ninternal mobility &\nredeployment rate\n\n"
    "wage progression of\nreskilled workers\n\ntime-to-proficiency",
    "#fdf3e7", "#eb6834")

for x0 in (3.18, 6.58):
    ax.annotate("", xy=(x0 + 0.36, 6.3), xytext=(x0, 6.3),
                arrowprops=dict(arrowstyle="-|>", color=INK2, linewidth=1.6))

ax.add_patch(mpl.patches.FancyBboxPatch(
    (0.15, 0.15), 9.8, 2.1, boxstyle="round,pad=0.10,rounding_size=0.12",
    facecolor="#f4f4f1", edgecolor=BASE, linewidth=1.0, zorder=2))
ax.text(5.05, 1.98, "Continuous feedback loop", ha="center", va="top",
        fontsize=10, fontweight="bold", color=INK)
ax.text(5.05, 1.52,
        "KPI results feed back into KSA gap analysis and next-cycle OKRs: lagging usage KPIs trigger revised training (Knowledge/Skills);\n"
        "lagging redeployment KPIs trigger revised role design (Abilities). OKRs are re-baselined each cycle against updated\n"
        "skills-demand data (WEF, PwC, LinkedIn) so the program tracks the market, not last year's curriculum.",
        ha="center", va="top", fontsize=7.8, color=INK2, linespacing=1.5)
ax.annotate("", xy=(1.6, 2.35), xytext=(1.6, 2.75),
            arrowprops=dict(arrowstyle="-|>", color=INK2, linewidth=1.4))
ax.annotate("", xy=(8.4, 2.75), xytext=(8.4, 2.35),
            arrowprops=dict(arrowstyle="-|>", color=INK2, linewidth=1.4))
ax.set_title("An integrated KSA \u2192 OKR \u2192 KPI framework for AI workforce development",
             loc="left", pad=10)
footnote(fig, "Framework synthesized by the authors from WEF (2025), PwC (2026), UNESCO AI competency frameworks, and U.S. OPM KSA practice.")
fig.savefig("fig9_ksa_okr_kpi.png")
plt.close(fig)

print("All figures generated.")
