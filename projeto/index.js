var fs = require('fs');
const puppeteer = require('puppeteer');

async function simplefileDownload() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN || null,
            args: [
                '--no-sandbox'
            ]
        });
        const page = await browser.newPage();
        await page.goto(
            'https://unsplash.com/photos/tn57JI3CewI',
            { waitUntil: 'networkidle2' }
        );


        let element = await page.$('span[class="wl5gA')
        let value = await page.evaluate(el => el.textContent, element)
        console.log("Botão para download encontrado: ", value)

        const client = await page.target().createCDPSession();
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: '/app/upload',
        });

        await page.evaluate(() => document.querySelector('.wl5gA').click())

        let numeroVerificacaoPermitida = 0
        var interval = setInterval(async function () {
            if (fs.existsSync('/app/upload/alexander-grey-tn57JI3CewI-unsplash.jpg')) {
                console.warn('Download do arquivo realizado com sucesso!')
                await browser.close();
                clearInterval(interval);
            } else {
                numeroVerificacaoPermitida ++
                console.warn('Ainda não foi feito download do arquivo.')

                if (numeroVerificacaoPermitida >= 5) {
                    await browser.close();
                    clearInterval(interval);
                }
            }
        }, 1000)
    } catch (error) {
        console.error(error.message)
    }
}

simplefileDownload();