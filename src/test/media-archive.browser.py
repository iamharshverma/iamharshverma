"""Run with python3 src/test/media-archive.browser.py against the local preview."""
import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright, expect


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        await page.goto("http://localhost:8080/media")
        await page.wait_for_timeout(2500)
        archive = page.locator("#media-archive")
        await expect(archive.locator("article")).to_have_count(6)
        await archive.get_by_role("button", name="Explore More", exact=True).click()
        await expect(archive.locator("article")).to_have_count(45)
        await expect(archive.get_by_role("button", name="Explore More", exact=True)).to_have_count(0)
        source = (Path(__file__).parent.parent / "data" / "media.ts").read_text()
        records = json.loads(source.split("export const media: MediaItem[] = ")[1].split("\n];")[0] + "]")
        for index, record in enumerate(records):
            await archive.locator("article").nth(index).get_by_role("button").click()
            dialog = page.get_by_role("dialog")
            await expect(dialog.get_by_role("heading")).to_have_text(record["title"])
            await expect(dialog.get_by_role("link", name=record["cta"], exact=True)).to_have_attribute("href", record["href"])
            await expect(dialog).to_contain_text(record["quote"])
            await page.keyboard.press("Escape")
            await expect(dialog).to_have_count(0)
        await archive.get_by_role("button", name="Interviews & Podcasts", exact=True).click()
        await expect(archive.locator("article")).to_have_count(6)
        await archive.get_by_role("button", name="Explore More", exact=True).click()
        await expect(archive.locator("article")).to_have_count(7)
        print("Verified all 45 detail popups, original links and summaries, one-click archive expansion and filtered interviews.")
        await browser.close()


asyncio.run(main())