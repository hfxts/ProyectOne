
const puppeteer = require('puppeteer')

describe('Emulando dispotivos', () => {
    
    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            //slowMo: 500

        })
        // Para correr en navegador incognito

        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0'})
        
    }, 20000)

    afterAll(async () => {
        await browser.close()

    })

    it('Emulando dispositivos de forma manual', async () => {
        
        await page.emulate({
            name: 'Galaxy J6',
            viewport: {
                width: 360,
                height: 740,
                deviceScaleFactor: 4,
                isMobile: true,
                hasTouch: true,
                isLandscape: false,
            },
            userAgent: 'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
        })

        await page.waitForTimeout(3000)

    }, 40000)

    it('Emulando sitio de escritorio', async () => {
        
        await page.setViewport({
            width: 1280,
            height: 800,
        })

        await page.waitForTimeout(3000)

    }, 40000)

    it('Emulando sitio en una tablet', async () => {
        
      
        const tablet = puppeteer.devices['iPad landscape']
        await page.emulate(tablet)
        
        await page.waitForTimeout(3000)

    }, 40000)

    it('Emulando sitio en un celular', async () => {
        
      
        const iPhone = puppeteer.devices['iPhone X']
        await page.emulate(iPhone)
        
        await page.waitForTimeout(3000)

    }, 40000)

})