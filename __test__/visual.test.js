
const puppeteer = require('puppeteer')
const {toMatchImageSnapshot} = require('jest-image-snapshot')
expect.extend({toMatchImageSnapshot})

describe('Visual Test', () => {
    
    let browser
    let page
    beforeAll( async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewPort: null
        })

        page = await browser.newPage()
        await page.goto('https://platzi.com')

    }, 30000);

    afterAll(async () => {
       await browser.close()

    })


    it('Snapshot de pantalla', async () => {
      
        await page.waitForSelector('img')
        
        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot()

    }, 350000);

    it('Snapshot de un elemento', async () => {
        
        const image = await page.waitForSelector('img')

        const screenshot = await image.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: '0.05',
            failureThresholdType: 'percent'
        })
    });

    it('Snapshot de un elemento de un iPad', async () => {
        
        const tablet = puppeteer.devices['iPad Pro']
        await page.emulate(tablet)


        const image = await page.waitForSelector('img')

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: '0.05',
            failureThresholdType: 'percent'
        })
    });

    it('Remover imagen antes de crear snapshot', async () => {
        

        const image = await page.waitForSelector('img')

        await page.evaluate( () =>
        (document.querySelectorAll('img') || []).forEach((img) => img.remove())
        )
        

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: '0.05',
            failureThresholdType: 'percent'
        })
    });

});