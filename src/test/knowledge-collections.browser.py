import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/knowledge-premium')
OUT.mkdir(parents=True,exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context(viewport={'width':1280,'height':1800})
  page=await context.new_page(); errors=[]
  page.on('pageerror',lambda err:errors.append(str(err)))
  await page.goto('http://localhost:8080/knowledge?topic=Agent+trust',wait_until='networkidle')
  await page.locator('.knowledge-network').scroll_into_view_if_needed()
  await page.wait_for_timeout(1000)
  await page.screenshot(path=str(OUT/'graph-desktop.png'))
  groups=page.locator('.knowledge-result-group')
  print('collections',await groups.evaluate_all('(sections)=>sections.map(s=>({name:s.getAttribute("aria-label"),count:s.querySelectorAll("article").length}))'))
  assert await groups.count()==4
  assert await page.locator('#knowledge-articles article').count()==6
  assert await page.locator('#knowledge-research article').count()==3
  assert await page.locator('#knowledge-keynotes article').count()==2
  assert await page.locator('#knowledge-interviews article').count()==3
  assert await page.locator('.kn-readable').count()>0
  assert await page.get_by_label('Connected knowledge details').locator('a[href^="/insights/"]').count()==6
  assert await page.get_by_label('Connected knowledge details').locator('a[href^="/talks/"]').count()==2
  await page.get_by_label('Browse connected collections').get_by_role('button',name='Keynotes & Talks').click()
  await page.wait_for_timeout(800)
  print('jump position',await page.locator('#knowledge-keynotes').evaluate('(s)=>s.getBoundingClientRect().top'))
  assert await page.locator('#knowledge-keynotes').evaluate('(s)=>s.getBoundingClientRect().top>=0 && s.getBoundingClientRect().top<innerHeight-150')
  await page.screenshot(path=str(OUT/'keynote-group.png'))
  await page.locator('.knowledge-network').scroll_into_view_if_needed()
  await page.get_by_role('button',name='Focus selected domain',exact=True).click()
  await page.wait_for_timeout(800)
  await page.get_by_role('button',name='Pause graph animation',exact=True).click()
  assert not await page.locator('.knowledge-network').evaluate('(el)=>el.classList.contains("kn-motion")')
  await page.get_by_role('button',name='Resume graph animation',exact=True).click()
  await page.get_by_role('button',name='Expand graph',exact=True).click()
  await page.wait_for_timeout(700)
  print('expanded height',await page.locator('.kn-stage').evaluate('(el)=>el.clientHeight'))
  assert await page.locator('.kn-stage').evaluate('(el)=>el.clientHeight')==760
  await page.get_by_role('button',name='Compact graph',exact=True).click()
  await page.get_by_role('button',name='Agentic Security',exact=True).click()
  await page.wait_for_timeout(500)
  print('security groups',await groups.evaluate_all('(sections)=>sections.map(s=>s.getAttribute("aria-label"))'))
  await page.get_by_role('button',name='Autonomous Defense',exact=True).click()
  assert await page.locator('#knowledge-books article').count()==1
  assert await page.get_by_label('Connected knowledge details').locator('a[href="/books/ai-vs-ai"]').count()==1
  await page.locator('.knowledge-grouped-results').scroll_into_view_if_needed()
  await page.screenshot(path=str(OUT/'results-desktop.png'))
  await page.set_viewport_size({'width':390,'height':844})
  await page.goto('http://localhost:8080/knowledge?topic=Agent+trust',wait_until='networkidle')
  await page.locator('.knowledge-network').scroll_into_view_if_needed()
  await page.wait_for_timeout(900)
  await page.screenshot(path=str(OUT/'graph-mobile.png'))
  assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  await page.locator('#knowledge-articles').scroll_into_view_if_needed()
  await page.wait_for_timeout(700)
  await page.screenshot(path=str(OUT/'articles-mobile.png'))
  await page.emulate_media(reduced_motion='reduce')
  await page.reload(wait_until='networkidle')
  await page.locator('.knowledge-network').scroll_into_view_if_needed()
  await page.wait_for_function('!document.querySelector(".knowledge-network")?.classList.contains("kn-motion")')
  assert not await page.locator('.knowledge-network').evaluate('(el)=>el.classList.contains("kn-motion")')
  print('reduced motion animation',await page.locator('.kn-monogram').evaluate('(el)=>getComputedStyle(el,"::after").animationName'))
  print('errors',json.dumps(errors))
  await browser.close()
asyncio.run(main())
