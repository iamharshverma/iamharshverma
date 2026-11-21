import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/knowledge-impact')
OUT.mkdir(parents=True,exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context(viewport={'width':1280,'height':1800})
  page=await context.new_page(); errors=[]
  page.on('pageerror',lambda e: errors.append(str(e)))
  await page.goto('http://localhost:8080/knowledge-impact',wait_until='networkidle')
  await page.get_by_role('tab',name='Research Graph').wait_for()
  await page.get_by_label('Graph view',exact=True).select_option('Concept')
  await page.wait_for_timeout(1200)
  await page.screenshot(path=str(OUT/'desktop-graph.png'))
  print('graph nodes',await page.locator('.react-flow__node').count(),'title',await page.title())
  await page.get_by_role('button',name='Expand cluster',exact=True).click()
  print('expanded nodes',await page.locator('.react-flow__node').count())
  await page.get_by_role('button',name='Explore this concept',exact=True).click()
  await page.get_by_role('heading',name='Explore the Intelligence Landscape.').wait_for()
  print('concept url',page.url)
  await page.get_by_role('button',name='Experiment with this idea',exact=True).click()
  await page.get_by_role('heading',name='Inside the Agentic System.').wait_for()
  await page.screenshot(path=str(OUT/'desktop-lab.png'))
  for scenario in ['research','unauthorized','injection','defense']:
   await page.get_by_label('Simulation scenario').select_option(scenario)
   for _ in range(16):
    step=page.get_by_role('button',name='Step',exact=True)
    if await step.is_disabled(): break
    await step.click()
   print(scenario,await page.get_by_label('Execution timeline').inner_text())
  await page.get_by_label('Action risk').select_option('high')
  for _ in range(16):
   step=page.get_by_role('button',name='Step',exact=True)
   if await step.is_disabled(): break
   await step.click()
  assert await page.get_by_label('Execution timeline').get_by_text('Awaiting approval',exact=True).count()==1
  await page.get_by_label('Grant exact-action approval').check()
  for _ in range(16):
   step=page.get_by_role('button',name='Step',exact=True)
   if await step.is_disabled(): break
   await step.click()
  assert await page.get_by_label('Execution timeline').get_by_text('Recovery verified',exact=True).count()==1
  await page.get_by_role('button',name='Locate this idea on the radar').click()
  await page.get_by_role('heading',name='AI Engineering Radar.').wait_for()
  await page.screenshot(path=str(OUT/'desktop-radar.png'))
  await page.get_by_label('Search radar').fill('Agent Identity')
  print('radar search',await page.get_by_label('Radar technologies').inner_text())
  await page.get_by_label('Radar technologies').get_by_role('button').click()
  await page.get_by_role('button',name='Compare technology',exact=True).click()
  await page.get_by_label('Search radar').fill('Runtime Security')
  await page.get_by_label('Radar technologies').get_by_role('button').click()
  await page.get_by_role('button',name='Compare technology',exact=True).click()
  print('comparison',await page.get_by_label('Technology comparison').inner_text())
  await page.set_viewport_size({'width':390,'height':844})
  await page.goto('http://localhost:8080/knowledge-impact',wait_until='networkidle')
  await page.wait_for_timeout(600)
  await page.screenshot(path=str(OUT/'mobile-graph.png'))
  print('mobile widths',await page.evaluate('({viewport:innerWidth,page:document.documentElement.scrollWidth})'))
  for name in ['Intelligence Landscape','Agentic Playground','Engineering Radar']:
   await page.get_by_role('tab',name=name).click()
   print('mobile',name,await page.evaluate('document.documentElement.scrollWidth'))
   await page.screenshot(path=str(OUT/(name.replace(' ','-')+'-mobile.png')))
  print('page errors',json.dumps(errors))
  await browser.close()
asyncio.run(main())
