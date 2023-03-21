const puppeteer = require('puppeteer')

describe('Medir el perfomance de la pagina en diferentes aspectos', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	it('Debera medir el perfomance del first paint y first contectful paint', async () => {
		const navigationPromise = page.waitForNavigation()
		await page.goto('https://platzi.com/')
		await navigationPromise

		const firstPaint = JSON.parse(
			await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')))
		)
		const firstContentfulPaint = JSON.parse(
			await page.evaluate(() =>
				JSON.stringify(performance.getEntriesByName('first-contentful-paint'))
			)
		)

		console.log('firstPaint ', firstPaint)
		console.log('firstContentfulPaint ', firstContentfulPaint)
	}, 250000)

	it('Debera medir el performance de los frames por segundo', async () => {
		const devtoolsProtocolClient = await page.target().createCDPSession()
		await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true })
		await page.goto('https://platzi.com/')

		await page.screenshot({ path: 'framesPorSegundo.jpg', type: 'jpeg' })
	}, 350000)
}, 450000)
