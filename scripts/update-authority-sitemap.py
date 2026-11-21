"""Validate canonical public pages before refreshing sitemap and AI discovery.

Run against the local preview. Existing lastmod values are retained because their
provenance is unknown; no generation/build dates are ever manufactured.
"""
from pathlib import Path
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup

origin = "https://www.iamharshverma.com"
preview = "http://localhost:8080"
namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
ET.register_namespace("", namespace)
path = Path("public/sitemap.xml")
tree = ET.parse(path)
root = tree.getroot()
existing = {entry.text for entry in root.iter(f"{{{namespace}}}loc") if entry.text}
assert all(urlparse(url).netloc == urlparse(origin).netloc for url in existing)
paths = {urlparse(url).path for url in existing}
for route in Path("src/routes").glob("*.tsx"):
    if route.name.startswith("__") or "$" in route.name:
        continue
    paths.add("/" if route.name == "index.tsx" else "/" + route.name.removesuffix(".tsx").removesuffix(".index"))

def inspect(page_path):
    response = requests.get(preview + page_path, timeout=60)
    response.raise_for_status()
    page = BeautifulSoup(response.text, "html.parser")
    links = page.select('link[rel="canonical"]')
    assert len(links) == 1, f"Expected one canonical: {page_path}"
    url = links[0].get("href", "")
    assert urlparse(url).netloc == urlparse(origin).netloc, f"Wrong canonical host: {page_path}"
    assert not urlparse(url).query and not urlparse(url).fragment
    robots = page.select_one('meta[name="robots"]')
    assert not robots or "noindex" not in robots.get("content", ""), f"Hidden page: {page_path}"
    title = page.title.get_text() if page.title else ""
    description = page.select_one('meta[name="description"]')
    assert title and description and description.get("content"), f"Missing metadata: {page_path}"
    discovered = set()
    for anchor in page.select("main a[href]"):
        parsed = urlparse(anchor.get("href", ""))
        if parsed.scheme or parsed.netloc or not parsed.path.startswith("/"):
            continue
        if parsed.path.startswith(("/downloads/", "/api/")) or "." in parsed.path.rsplit("/", 1)[-1]:
            continue
        discovered.add(parsed.path)
    return url, title, description.get("content"), discovered

records = {}
checked = set()
# Inspect every URL and follow public content links, not only the first Hub page.
while paths - checked:
    batch = sorted(paths - checked)
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(inspect, batch))
    checked.update(batch)
    for url, title, description, discovered in results:
        records[url] = (title, description)
        paths.update(discovered)

# Replace redirect/duplicate entries with their actual canonical destinations.
seen = set()
for entry in list(root):
    loc = entry.find(f"{{{namespace}}}loc")
    if loc is None or loc.text not in records or loc.text in seen:
        root.remove(entry)
    else:
        seen.add(loc.text)
for url in sorted(records.keys() - seen):
    entry = ET.SubElement(root, f"{{{namespace}}}url")
    ET.SubElement(entry, f"{{{namespace}}}loc").text = url
ET.indent(tree, space="  ")
tree.write(path, encoding="UTF-8", xml_declaration=True)

groups = {"Pages": [], "Publications": [], "Articles": [], "Research": [], "Engineering": [], "Talks": [], "Media": [], "Books": []}
categories = {"publications": "Publications", "insights": "Articles", "research": "Research", "engineering": "Engineering", "talks": "Talks", "media": "Media", "books": "Books"}
for url, (title, description) in sorted(records.items()):
    segments = urlparse(url).path.strip("/").split("/")
    group = categories.get(segments[0], "Pages") if len(segments) > 1 else "Pages"
    groups[group].append(f"- [{title.replace('[', '').replace(']', '')}]({url}): {description}")
lines = ["# Harsh Verma", "> Principal Software Engineer at Palo Alto Networks | AI, Cybersecurity & Agentic Systems. Speaker and author.", "", "Public source-linked portfolio. Personal perspectives are not employer endorsements. Publication statuses and abstracts are source-reported; forthcoming and under-review works are not published papers. Illustrative graph emphasis is not measured impact. Simulations are educational, not live enterprise actions."]
for group, entries in groups.items():
    lines.extend(["", f"## {group}", *entries])
Path("public/llms.txt").write_text("\n".join(lines) + "\n")
print(f"Validated {len(checked)} paths; sitemap and AI discovery contain {len(records)} canonical public pages.")