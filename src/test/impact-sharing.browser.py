import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/impact-share')
OUT.mkdir(parents=True, exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  context=await b.new_context(viewport={'width':1280,'height':1800},permissions=['clipboard-read','clipboard-write'])
  page=await context.new_page(); errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto('http://localhost:8080/knowledge-impact',wait_until='networkidle')
  await page.get_by_label('Change exploration topic').select_option('security')
  await page.get_by_label('Graph view',exact=True).select_option('Research')
  await page.get_by_label('Graph category',exact=True).select_option('security')
  await page.get_by_role('button',name='Expand cluster',exact=True).click()
  await page.get_by_role('button',name='Share exploration',exact=True).click()
  graph_link=await page.evaluate('navigator.clipboard.readText()')
  await page.reload(wait_until='networkidle')
  assert await page.get_by_label('Graph view',exact=True).input_value()=='Research'
  assert await page.get_by_label('Graph category',exact=True).input_value()=='security'
  assert await page.get_by_role('button',name='Collapse cluster',exact=True).count()==1
  print('graph restored',graph_link)
  await page.get_by_role('tab',name='Agentic Playground').click()
  await page.get_by_label('Simulation scenario').select_option('defense')
  await page.get_by_label('Required tool permission').uncheck()
  await page.get_by_label('Illustrative trust',exact=True).fill('20')
  await page.get_by_label('Action risk').select_option('high')
  await page.get_by_label('Require human approval').check()
  await page.get_by_label('Grant exact-action approval').check()
  await page.get_by_role('button',name='Share exploration',exact=True).click()
  shared=await page.evaluate('navigator.clipboard.readText()')
  second=await context.new_page()
  await second.goto(shared,wait_until='networkidle')
  assert await second.get_by_label('Simulation scenario').input_value()=='defense'
  assert not await second.get_by_label('Required tool permission').is_checked()
  assert await second.get_by_label('Illustrative trust',exact=True).input_value()=='20'
  assert await second.get_by_label('Action risk').input_value()=='high'
  assert await second.get_by_label('Require human approval').is_checked()
  assert await second.get_by_label('Grant exact-action approval').is_checked()
  assert await second.get_by_label('Simulation progress').get_attribute('value')=='0'
  print('simulation shared & restored',shared)
  for _ in range(16):
   step=second.get_by_role('button',name='Step',exact=True)
   if await step.is_disabled():break
   await step.click()
  print('restored simulation outcome',await second.get_by_label('Execution timeline').inner_text())
  await page.goto('http://localhost:8080/knowledge-impact',wait_until='networkidle')
  for mode,name in [('graph','Research Graph'),('landscape','Intelligence Landscape'),('playground','Agentic Playground'),('radar','Engineering Radar')]:
   await page.get_by_role('tab',name=name).click()
   await page.get_by_role('tabpanel').scroll_into_view_if_needed()
   await page.screenshot(path=str(OUT/(mode+'-desktop.png')))
   print('sources',mode,await page.get_by_label('Source records').get_by_role('link').count())
  await page.evaluate("document.documentElement.dataset.theme='light'")
  await page.get_by_role('tabpanel').scroll_into_view_if_needed()
  await page.screenshot(path=str(OUT/'radar-light.png'))
  await page.evaluate("document.documentElement.dataset.theme='noir'")
  await page.get_by_role('tabpanel').scroll_into_view_if_needed()
  await page.screenshot(path=str(OUT/'radar-noir.png'))
  await page.set_viewport_size({'width':390,'height':844})
  for mode,name in [('graph','Research Graph'),('landscape','Intelligence Landscape'),('playground','Agentic Playground'),('radar','Engineering Radar')]:
   await page.get_by_role('tab',name=name).click()
   await page.get_by_role('tabpanel').scroll_into_view_if_needed()
   await page.screenshot(path=str(OUT/(mode+'-mobile.png')))
   assert not await page.evaluate('document.documentElement.scrollWidth>innerWidth')
  await page.goto('http://localhost:8080/knowledge',wait_until='networkidle')
  await page.locator('.kn-stage').scroll_into_view_if_needed()
  await page.wait_for_timeout(400)
  await page.screenshot(path=str(OUT/'hub-mobile.png'))
  await page.get_by_role('button',name='Agentic Security',exact=True).click()
  assert 'AI+security' in page.url
  await page.get_by_role('button',name='Reset graph',exact=True).click()
  await page.get_by_role('button',name='Library',exact=True).click()
  assert await page.locator('.knowledge-network').count()==0
  print('errors',json.dumps(errors))
  await b.close()
asyncio.run(main())
