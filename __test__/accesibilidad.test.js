const puppeteer = require('puppeteer')
const { AxePuppeteer } = require('@axe-core/puppeteer')

describe('Accesibildad', () => {
	let browser
	let page
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})

		page = await browser.newPage()
	}, 250000)

	afterAll(async () => {
		await browser.close()
	})

	it('Probar accesibilidad', async () => {
		await page.goto('https://platzi.com/')
		await page.waitForSelector('img')
		const snapshot = await page.accessibility.snapshot()
		console.log(snapshot)
	}, 350000)

	it('Probar accesibilidad con Axe', async () => {
		await page.setBypassCSP(true)
		await page.goto('https://platzi.com/')
		await page.waitForSelector('img')
		const result = await new AxePuppeteer(page).analyze()

		console.log(result.violations[0].nodes[0])
	}, 350000)
})
