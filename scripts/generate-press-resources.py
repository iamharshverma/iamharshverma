"""Offline generation: pipe shared identity/talk JSON into this script from Bun."""
import json
import sys
from pathlib import Path
from html import escape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

payload = json.load(sys.stdin)
identity = payload["identity"]
out = Path("public/downloads")
out.mkdir(parents=True, exist_ok=True)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Identity", fontName="Helvetica-Bold", fontSize=24, leading=29, textColor=colors.HexColor("#163B69"), spaceAfter=18))
styles.add(ParagraphStyle(name="BodyCopy", fontName="Helvetica", fontSize=10, leading=16, spaceAfter=10, alignment=TA_LEFT))
titles = {"press-kit": "Press Kit", "media-kit": "Media Kit", "speaker-bio": "Speaker Biography"}
text = [identity["name"], identity["positioning"], ""]
for label, key in [("Short biography — 50 words", "short"), ("Standard biography — 100 words", "standard"), ("Extended biography — 250 words", "extended")]:
    bio = identity["biographies"][key]
    expected = {"short": 50, "standard": 100, "extended": 250}[key]
    assert len(bio.split()) == expected
    text.extend([label, bio, ""])
text.extend(["Website: https://www.iamharshverma.com/", "Contact: harshverma59@gmail.com"])
(out / "harsh-verma-biographies.txt").write_text("\n".join(text), encoding="utf-8")
for slug, title in titles.items():
    story = [Paragraph(escape(identity["name"]), styles["Identity"]), Paragraph(title, styles["Heading2"]), Paragraph(escape(identity["positioning"]), styles["BodyCopy"])]
    for label, key in [("Short biography · 50 words", "short"), ("Standard biography · 100 words", "standard"), ("Extended biography · 250 words", "extended")]:
        story.append(Paragraph(label, styles["Heading2"]))
        for paragraph in identity["biographies"][key].split("\n\n"):
            story.append(Paragraph(escape(paragraph), styles["BodyCopy"]))
    story.append(PageBreak())
    story.append(Paragraph("Speaking & interview themes", styles["Identity"]))
    for talk in payload["talks"]:
        story.append(Paragraph(escape(talk["title"]), styles["Heading2"]))
        story.append(Paragraph(escape(talk["summary"]), styles["BodyCopy"]))
        story.append(Paragraph("Audience: " + escape(talk["audience"]), styles["BodyCopy"]))
        for takeaway in talk["takeaways"]:
            story.append(Paragraph("• " + escape(takeaway), styles["BodyCopy"]))
    story.extend([Spacer(1, 12), Paragraph("Formats and duration are agreed per event. Both books are planned for January 2027.", styles["BodyCopy"]), Paragraph("Official portrait downloads: https://www.iamharshverma.com/press-kit", styles["BodyCopy"]), Paragraph("Website: https://www.iamharshverma.com/", styles["BodyCopy"]), Paragraph("Contact: harshverma59@gmail.com", styles["BodyCopy"])])
    SimpleDocTemplate(str(out / f"harsh-verma-{slug}.pdf"), title=f"Harsh Verma — {title}", author=identity["name"], leftMargin=48, rightMargin=48, topMargin=42, bottomMargin=42).build(story)
print("Generated three biography PDFs and the text resource from shared identity records.")