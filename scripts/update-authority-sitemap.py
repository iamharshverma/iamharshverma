"""Merge discoverable authority-page URLs from the SSR Knowledge Hub into the sitemap."""
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup

response = requests.get("http://localhost:8080/knowledge", timeout=60)
response.raise_for_status()
page = BeautifulSoup(response.text, "html.parser")
assert "Knowledge" in page.get_text(), "Knowledge Hub did not render"
namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
ET.register_namespace("", namespace)
path = Path("public/sitemap.xml")
tree = ET.parse(path)
root = tree.getroot()
existing = {entry.text for entry in root.iter(f"{{{namespace}}}loc")}
paths = {"/knowledge", "/engineering", "/resources"}
for anchor in page.select("main a[href]"):
    href = anchor.get("href", "")
    parsed = urlparse(href)
    if parsed.scheme or parsed.netloc or not parsed.path.startswith("/") or parsed.path.startswith("/downloads/"):
        continue
    paths.add(parsed.path)
for page_path in sorted(paths):
    url = "https://www.iamharshverma.com" + page_path
    if url not in existing:
        entry = ET.SubElement(root, f"{{{namespace}}}url")
        ET.SubElement(entry, f"{{{namespace}}}loc").text = url
        existing.add(url)
ET.indent(tree, space="  ")
tree.write(path, encoding="UTF-8", xml_declaration=True)
print(f"Sitemap now contains {len(existing)} unique URLs, including all Knowledge Hub detail links.")