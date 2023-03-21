

const puppeteer = require('puppeteer')
const { getText, getCount } = require('./lib/helpers')

describe('Extrayendo informacion ', () => {

    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            //slowMo: 500

        })

        page = await browser.newPage()
        await page.goto('https://platzi.com', { waitUntil: 'networkidle0'})
        
    }, 30000)

    afterAll(async () => {
        await browser.close()

    })
 
    it('Extraer informacion de la pagina', async () => {
  
        // Extrayendo Selector

        await page.waitForSelector('#Header-v2 > nav > div.Menu > div > div > ul > li:nth-child(2) > a')

        const nombreBoton = await getText(page, '#Header-v2 > nav > div.Menu > div > div > ul > li:nth-child(2) > a')

        console.log('El nombre del boton es: ', nombreBoton)

    
    }, 350000)
    

    it('Contar los elementos de una pagina', async () => {

        // Contar imagenes en la pagina

        const images = await getCount(page, 'img')

        console.log('Hay un total de ', images, ' imagenes')


    }, 350000)
    

    
})