const puppeteer = require('puppeteer')

describe('Geolocalizacion', () => {
    
    let browser
    let page

    beforeAll( async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        page = await browser.newPage()

    }, 250000)

    afterAll( async () => {
        await browser.close()

    })


    it('Cambio de Geolocalizacion', async () => {
       const context = browser.defaultBrowserContext()

       await context.overridePermissions('https://chercher.tech/practice/geo-location.html', ['geolocation'])

       await page.setGeolocation({latitude: 20, longitude: -90})

       await page.goto('https://chercher.tech/practice/geo-location.html')
       await page.waitForTimeout('10000')

    }, 350000);

});