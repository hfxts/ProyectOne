const puppeteer = require('puppeteer')

describe('Generacion de PDF', () => {
    
    let browser
    let page

    beforeAll( async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        
        page = await browser.newPage()
        await page.goto('https://google.com/', {waitUntil: 'networkidle0'})

    }, 30000)

    afterAll ( async () => {
        await browser.close()

    })

    it('PDF de pagina completa', async () => {

        let pdfCSS = []
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = await pdfCSS.join('')

        await page.pdf({
            path: './google.pdf',
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: css + '<h1>' + 'Mi primer PDF usando Puppeteer' + '</h1>',
            footerTemplate: css + '<h1> Page <span class = "pageNumber"></span> of <span class = "totalPages"> </span></h1>',
            

        });

    });

    it('PDF de pagina completa Landscape', async () => {

        let pdfCSS = []
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = await pdfCSS.join('')

        await page.pdf({
            path: './landscapeGoogle.pdf',
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
            displayHeaderFooter: true,
            headerTemplate: css + '<h1>' + 'Mi primer PDF usando Puppeteer' + '</h1>',
            footerTemplate: css + '<h1> Page <span class = "pageNumber"></span> of <span class = "totalPages"> </span></h1>',
            landscape: true
            

        });

    });


}, 350000);