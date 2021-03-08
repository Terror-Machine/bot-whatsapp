const puppeteer = require('puppeteer')
const uaOverride = "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83";
const fetch = require('node-fetch');

class Scrap {
    constructor(){
        this.start()
    }

    async start(){
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ],
            executablePath: '/usr/bin/google-chrome'
        });
    }

    async blackpink(text){
        return this.textpro1input('https://textpro.me/create-blackpink-logo-style-online-1001.html', text)
    }

    async glitch(top, bot){
        return this.textpro2input('https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html', top, bot)
    }

    async sand(text){
        return this.textpro1input('https://textpro.me/sand-engraved-3d-text-effect-989.html', text)
    }

    async custom1(link, text){
        return this.textpro1input(link, text)
    }

    async custom2(link, top, bot){
        return this.textpro2input(link, top, bot)
    }

    textpro1input(link, text) {
        return new Promise(async(resolve, reject) => {
            try {
                const page = await this.browser.newPage();
                await page.setUserAgent(uaOverride)
                await page.setRequestInterception(true);
                page.on('request', (req) => {
                    if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
                        req.abort();
                    }else {
                        req.continue();
                    }
                });             
                await page
                    .goto(link, {waitUntil: 'networkidle0'})
                    .then(async() => {
                        const inputSelector = '#content-wrapper > section > div > div.col-md-9 > form > ul > li.item-content > div > div > input'
                        const input = await page.$(inputSelector)
                        await input.type(text)
                        await page.click('#content-wrapper > section > div > div.col-md-9 > form > ul > li:nth-child(2) > input')
                        await page.waitForSelector('#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img')
                        const img = await page.$eval('#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img', (x) => x.src)
                        const response = await fetch(img);
                        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
                        await page.close();
                        return resolve(await response.buffer())
                    }).catch(async () => {
                        await page.close();
                        return reject(`[GAGAL] terjadi error!`)
                    });        
            } catch (error) {
                return reject(`[GAGAL] terjadi error!`)
            }
        })
    }
    
    textpro2input(link, text1, text2) {
        return new Promise(async(resolve, reject) => {
            try {
                const page = await this.browser.newPage();
                await page.setUserAgent(uaOverride)
                await page.setRequestInterception(true);
                page.on('request', (req) => {
                    if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
                        req.abort();
                    }else {
                        req.continue();
                    }
                });             
                await page
                    .goto(link, {waitUntil: 'networkidle0'})
                    .then(async() => {
                        const inputSelector = '#content-wrapper > section > div > div.col-md-9 > form > ul > li.item-content > div > div > input'
                        const inputSelector2 = '#content-wrapper > section > div > div.col-md-9 > form > ul > li:nth-child(2) > div > div > input'
                        const input = await page.$(inputSelector)
                        const input2 = await page.$(inputSelector2)
                        await input.type(text1)
                        await input2.type(text2)
                        await page.click('#content-wrapper > section > div > div.col-md-9 > form > ul > li:nth-child(3) > input')
                        await page.waitForSelector('#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img')
                        const img = await page.$eval('#content-wrapper > section > div > div.col-md-9 > div:nth-child(4) > div > img', (x) => x.src)
                        const response = await fetch(img);
                        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
                        await page.close();
                        return resolve(await response.buffer())
                    }).catch(async (error) => {
                        await page.close();
                        return reject(`[GAGAL] terjadi error!`)
                    });        
            } catch (error) {
                return reject(`[GAGAL] terjadi error!`)
            }
        })
    }

    async ss(link){
        return new Promise(async (resolve,reject) => {
            try {
                const page = await this.browser.newPage();
                await page.setViewport({
                    width: 1920,
                    height: 1080
                });
                await page.setUserAgent(uaOverride)                
                await page
                    .goto(link, {waitUntil: "networkidle0"})
                    .then(async() => {
                        const base64 = await page.screenshot({ encoding: "base64", fullPage: true })
                        await page.close();
                        return resolve(base64)
                    }).catch(async () => {
                        await page.close();
                        return reject(`[GAGAL] url tidak valid!`)
                    });  
            } catch (error) {
                return reject(`[GAGAL] terjadi error!`)
            }
        }) 
    }
}

module.exports = Scrap