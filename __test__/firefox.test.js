
const puppeteer = require('puppeteer')

describe('Extrayendo informacion ', () => {

 
    it('Extraer informacion de la pagina', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            product: 'firefox',
            defaultViewport: null,
            //slowMo: 500
        })
 
        const page = await browser.newPage()
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0'})

        // Extrayendo Titulo de pagina y URL

        const titulo = await page.title()
        const url = await page.url()

        console.log('Titulo', titulo)
        console.log('Url', url)

        // Extrayendo Selector

        await page.waitForSelector('#Header-v2 > nav > div.Menu > div > div > ul > li:nth-child(2) > a')
        const nombreBoton = await page.$eval('#Header-v2 > nav > div.Menu > div > div > ul > li:nth-child(2) > a',
        (button) => button.textContent)
        console.log('Nombre del boton ', nombreBoton)
        
        // Extrayendo xPath

        const [button] = await page.$x('//*[@id="Header-v2"]/nav/div[5]/div/div/ul/li[3]/a')
        const propiedad = await button.getProperty('textContent')
        const texto = await propiedad.jsonValue()

        console.log('Texo', texto)

        // 2da forma de extraer xPath
 
        const texto2 = await page.evaluate((name) => name.textContent, button)
        console.log('Texto 2 es ', texto2)

        // 3ra forma de extraer xPath

        const button3 = await page.waitForXPath('//*[@id="Header-v2"]/nav/div[5]/div/div/ul/li[3]/a')
        const texto3 = await page.evaluate((name) => name.textContent, button3)
        console.log('Texto 3 es ', texto3)

        await browser.close()
    
    }, 350000)
    

    it('Contar los elementos de una pagina', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })


        const page = await browser.newPage()
        await page.goto('http://platzi.com', { waitUntil: 'networkidle0' })

        // Contar imagenes en la pagina

        const images = await page.$$eval('img', (imagenes) => imagenes.length)
        console.log('Hay un total de ', images)

        await browser.close()

    }, 350000)
    
})