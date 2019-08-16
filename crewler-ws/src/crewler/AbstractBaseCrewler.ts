import * as puppeteer from 'puppeteer';
import * as path from 'path'
import { Browser, Page } from 'puppeteer';
import {Transform} from 'stream'
// const puppeteer = require('puppeteer-extra')

const userName = require('os').userInfo().username
// const pluginPath = `/Users/grabbywu/Library/Application Support/Google/Chrome/PepperFlash/32.0.0.223/PepperFlashPlayer.plugin`.trim()
// const pluginVersion = '32.0.0.223'

export abstract class AbstractBaseCrewler {

    browser: Browser
    page: Page
    crewlerTransform:Transform

    async run(isHeadless: boolean, url:string,crewlerTransform:any,...args: any) {
        /*
        * args
        0 true isHeadless 是否开启浏览器 
        1 综合排序 最多点击 最新发布 最多弹幕 最多收藏
        2 mongo 表后缀名控制 tableSuffix
        3 pageNum
        */
        // console.log(args[0])
        this.crewlerTransform = crewlerTransform
        await this.config(isHeadless)
        await this.start(url)
        // console.log(args[1])
        await this.parse(...args)
        // await this.storeData(result)
        await this.tearDwown()
        // process.kill(args[3])
    }

    async config(isHeadless: boolean) {
        // puppeteer.use(require('puppeteer-extra-plugin-flash')({
        //     pluginPath,pluginVersion
        // }))
        //browser单实例模式
        if (!this.browser){
            this.browser && this.browser.close()
            this.browser = await puppeteer.launch({
                headless: isHeadless,
                ignoreHTTPSErrors: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    // "–disable-gpu",
                    // "–disable-dev-shm-usage",
                    // "–disable-setuid-sandbox",
                    // "–no-first-run",
                    // "–no-zygote",
                    // "–single-process"
                ]
            });
        }
        
        /**设置userAgent */
        let ua = await this.browser.userAgent();
         // 1. 替换headless标识
        // console.log(ua)
        ua = ua.replace('HeadlessChrome/', 'Chrome/')
        // 2. 设为win10平台
        ua = ua.replace(/\(([^)]+)\)/, '(Windows NT 10.0; Win64; x64)')
        // 3. 使用自定义函数处理ua
        // ua = opts.customFn(ua)
        // 或者使用 扩展 https://github.com/berstend/puppeteer-extra/blob/master/packages/puppeteer-extra-plugin-anonymize-ua/index.js
        // console.log(ua)
        this.page = await this.browser.newPage();
        await this.page.setUserAgent(ua)
        /**
         * 使用 setRequestInterception() 拦截请求，屏蔽指定类型请求来加快加载速度
         */
            // const blockTypes = new Set(['image', 'media', 'font'])
            // await this.page.setRequestInterception(true)
            // this.page.on('request', request => {
            //     const type = request.resourceType()
            //     const shouldBlock = blockTypes.has(type)
            //     return shouldBlock ? request.abort() : request.continue()
            // })
        //对应扩展puppeteer-extra-plugin-block-resources

        // set a timeout of 8 minutes
        await this.page.setDefaultNavigationTimeout(480000)
        await this.page.setViewport({ width: 1300, height: 1500 })
        this.crewlerTransform.write('browser config finish')
    }

    timeout(delay: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(1);
                } catch (e) {
                    reject(0)
                }
            }, delay);
        });
    }



    abstract parse(...args: any): void;

    abstract storeData(...args: any): void;


    async start(path: string) {
        try {
            let page = this.page
            await page.goto(path,{waitUntil: 'domcontentloaded'}) //使page在 DOMContentLoaded 事件触发时就返回结果，而无需等到Load事件，这样就节省了等待构建渲染树与页面绘制的时间。
            this.crewlerTransform.write(`page navigation to ${path}`)
            const dimensions = await page.evaluate(() => {
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                    deviceScaleFactor: window.devicePixelRatio
                };
            });
            // console.log('Dimensions:', dimensions);
        } catch (error) {
            console.log(error)
            console.log("start error");
        }
    }


    range(start, end, step = 1) {
        let arr = [];
        for (let i = start; i < end; i++) {
            if (i % step == 0) { arr.push(i) }
        }
        return arr;
    }

    getDateTime() {
        let date = new Date()
        let current_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
        let current_time = date.getHours() + ':' + date.getMinutes() + '-' + date.getMilliseconds()
        return current_date + ' ' + current_time
    }

    async screenshot(url: string, imageName: string) {
        try {
            let filePrefix = url.split('/').reverse()[1]
            let fileName = filePrefix + '_' + this.getDateTime() + imageName + '.png'
            // console.log(filename)
            const filePath = path.join(__dirname, '../screen_shot/')
            await this.page.screenshot({ path: filePath + fileName });
        } catch (error) {
            console.log('截图失败')
        }
    }

    async tearDwown() {
        try {
            await this.browser.close();
            console.log('teardown success')
        } catch (error) {
            console.log(error)
            console.log("teardown error")
        }

    }

}
