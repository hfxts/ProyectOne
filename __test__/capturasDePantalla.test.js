
const puppeteer = require('puppeteer')

    describe('Capturas de Pantalla', () => {

        let browser
        let page
        beforeAll( async () => {
            browser = await puppeteer.launch({
                headless: false,
                defaultViewport: null
            
            })
        
            page = await browser.newPage()
            await page.goto('https://google.com')
        
            }, 20000)
        

        afterAll( async () => {
            await browser.close()

        })


    it('Captura de pantalla completa', async () => {
       
        await page.screenshot({
            path: './CapturaDePantallaCompleta.jpg',
            fullPage: true
        })  
    });


    it('Captura de pantalla a un elemento', async () => {
        const elemento = await page.waitForSelector('#hplogo')

        await elemento.screenshot({
            path: './CapturaDePantallaElemento.jpg',

         })
    });
    
}, 350000);