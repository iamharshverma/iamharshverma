"""Run with python3: category navigation must not leave the graph or close fullscreen."""
import asyncio
from playwright.async_api import async_playwright


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await context.new_page()
        for route in ["knowledge?topic=AI+security", "knowledge-impact"]:
            await page.goto(f"http://localhost:8080/{route}", wait_until="networkidle")
            await page.get_by_role("button", name="Detail List View", exact=True).click()
            panel = page.get_by_role("complementary", name="Connected knowledge details")
            categories = panel.get_by_label("Browse connected collections")
            url = page.url
            await categories.get_by_role("button", name="Articles", exact=False).click()
            article_links = await panel.get_by_label("Category entries").locator("button.kn-source-button").count()
            assert article_links > 0
            assert page.url == url
            await page.get_by_role("button", name="Enter full screen", exact=True).first.click()
            await categories.get_by_role("button", name="Research", exact=False).click()
            research_links = await panel.get_by_label("Category entries").locator("button.kn-source-button").count()
            assert research_links > 0
            assert page.url == url
            assert await page.get_by_role("button", name="Exit full screen", exact=True).count() > 0
            await panel.get_by_role("button", name="All categories", exact=True).click()
            await page.wait_for_timeout(300)
            assert await categories.locator('button[aria-pressed="true"]').count() == 0
            await page.keyboard.press("Escape")
            assert await page.get_by_role("button", name="Exit full screen", exact=True).count() == 0
        await page.close()
        page = await context.new_page()
        await page.goto("http://localhost:8080/knowledge", wait_until="networkidle")
        await page.get_by_role("button", name="Detail List View", exact=True).click()
        await page.get_by_role("button", name="Enter full screen", exact=True).click()
        search = page.get_by_role("combobox", name="Search graph topics and work")
        await search.fill("agent trust")
        await search.press("Enter")
        await page.get_by_role("complementary", name="Connected knowledge details").get_by_role("heading", name="Agent Trust", exact=True).wait_for()
        assert "Agent+trust" in page.url
        assert await page.get_by_role("button", name="Exit full screen", exact=True).count() == 1
        await search.fill("secure real time heterogeneous")
        await search.press("Enter")
        await page.get_by_role("complementary", name="Connected knowledge details").get_by_role("heading", name="Secure Real Time Heterogeneous Data Management Tool", exact=True).wait_for()
        assert "resource=publication" in page.url
        assert await page.get_by_role("button", name="Exit full screen", exact=True).count() == 1
        await browser.close()
    print("Both graph inspectors preserve local category navigation and full-screen state.")


asyncio.run(main())