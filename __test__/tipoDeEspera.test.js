
const puppeteer = require('puppeteer')

describe('Tipos de espera ', () => {


    it('Mostrar todos los diferentes tipos de espera', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
            
            
        })

        const page = await browser.newPage()
        await page.goto('http://platzi.com', { waitUntil: 'networkidle2'})

        //Espera explicita

        await page.waitForTimeout('1000')
 
        //Espera por un selector

        await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

        //Espera por xpath

        await page.waitForXPath('//*[@id="Header-v2"]/nav/div[1]/div/a/div/figure[2]/img')


        await page.goto('https://demoqa.com/modal-dialogs')
        const buttonXpath = await page.waitForXPath('//*[@id="showSmallModal"]')
        buttonXpath.click()
        await page.waitForTimeout('2000')

        await page.click('#closeSmallModal')
        await page.waitForTimeout('1000')
        
        const buttonSelector = await page.waitForSelector('#showLargeModal')
        buttonSelector.click()
        await page.waitForTimeout('1000')
        
        await page.click('#closeLargeModal')
        await page.waitForTimeout('2000')

    
        // Espera por Funcion

        const obersvarResize = page.waitForFunction('window.innerWidth < 100')
        await page.setViewport({ width: 50, height: 50 })

        await obersvarResize




        await browser.close()


    }, 350000)
})