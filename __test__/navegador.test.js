
const puppeteer = require('puppeteer')

describe(' Mi primer test en puppeteer', () => {

    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 0,
            devTools: false,
           // defaultViewport: {
           //     width: 2100,
           //     height: 1080
           // }
           //args: ['--window-size=1920,1080'],
           //visualViewport: null 
        })

        const page = await browser.newPage()
        await page.goto('https://www.google.com/')
        await page.waitForTimeout(5000)
        await page.waitForSelector('img')
        
        //Recargar la pagina
        await page.reload()
        await page.waitForSelector('img')

        //Navegar a otro sitio
        await page.goto('https://platzi.com/')
        await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

        //Navegar hacia atras y adelante
        await page.goBack()
        await page.goForward()

        //Abrir otra pagina
        const page2 = await browser.newPage()
        await page2.goto('https://youtube.com/')
        await page2.waitForTimeout(5000)





        await browser.close()
       
    }, 350000)

})