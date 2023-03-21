

const puppeteer = require('puppeteer')


describe(' Interactuando con elementos', () => {

    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']

        
        
        })

        const page = await browser.newPage()
        // await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

        // page.on('dialog', async (dialog) => {

        //     await dialog.accept()
        // })       

        // //Click derecho y click 

        // await page.click('#authentication > span', {button: 'right', delay: 500})
        // await page.waitForTimeout(1000)
        // await page.click('#authentication > span')
        // await page.waitForTimeout(1000)
        

        // //Doble click
        
        // await page.click('#authentication > button', {clickCount: 2, delay: 500})
        // await page.waitForTimeout(1000)

         //Llenar Formulario
        

         await page.goto('https://devexpress.github.io/testcafe/example/')
         await page.type('#developer-name', 'Tutankamón',{delay: 100})
         await page.waitForTimeout(1500)
         await page.click('#reusing-js-code')
         await page.waitForTimeout(1500)
         await page.click('#tried-test-cafe')
         await page.waitForTimeout(1500)
         await page.type('#comments', 'LISTO EQUIPOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!', {delay: (75)})
         await page.waitForTimeout(1500)
         await page.select('#preferred-interface', 'Both')
         await page.waitForTimeout(1500)
         await page.click('#submit-button')
         await page.waitForTimeout(3000)

        await browser.close()


    }, 350000)

})