const puppeteer = require('puppeteer')
const fs = require('fs')

describe('Probar Performance', () => {
	let page
	let browser
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

	it("Medir performance de la automatizacion", async () => {
	  page.goto("https://platzi.com/");
	  await page.waitForSelector("img");
	  const metrics = await page.metrics();

	  console.log(metrics);
	}, 350000);

	it("Medir performance de la pagina", async () => {
	  page.goto("https://platzi.com/");
	  await page.waitForSelector("img");
	  const metrics2 = await page.evaluate(() =>
	    JSON.stringify(window.performance)
	  );

	  console.log(metrics2);
	}, 350000);

	it("Medir el performance del page load", async () => {
	  await page.tracing.start({ path: "profile.json" });
	  await page.goto("https://google.com/");
	  await page.tracing.stop();
	}, 350000);

	it("Medir el performance del page load con Screenshot", async () => {
	  await page.tracing.start({ path: "profile.json", screenshot: true });
	  await page.goto("https://platzi.com/");
	  await page.tracing.stop();
	}, 350000);

	it('Medir el performance del page load con Screenshot extraerlos', async () => {
		await page.tracing.start({ path: 'profile.json', screenshot: true })
		await page.goto('https://platzi.com/')
		await page.tracing.stop()
		const tracing = JSON.parse(fs.readFileSync('./profile.json', 'utf8'))
		//filtrar JSON
		const traceScreenshots = tracing.traceEvents.filter((x) => {
			return (
				x.cat === 'disabled-by-default-devtools.screenshot' &&
				x.name === 'Screenshot' &&
				typeof x.args !== 'undefined' &&
				typeof x.args.snapshot !== 'undefined'
			)
		})

		//Iterar sobre este array para crear las imagenes

		traceScreenshots.forEach(function (snap, index) {
			fs.writeFile(`trace-screenshot-${index}.png`, snap.arg.snapshot, 'base64', function (err) {
				if (err) {
					console.log('No pude crear el archivo', err)
				}
			})
		})
	}, 350000)
})
