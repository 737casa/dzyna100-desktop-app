import {Puppeteer2ProductProps} from "./Puppeteer2";
import {Browser, Page} from "puppeteer";
import createPuppeteer2Helpers from "./Puppeteer2Helpers";
import vm from "vm"

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export interface Puppeteer2MethodProps {
    page: Page
    product: Puppeteer2ProductProps
    browser?: Browser
    helpers: Awaited<ReturnType<typeof createPuppeteer2Helpers>>
    getCode?: () => Promise<string>
}

function createPuppeteer2Method(f:(props:Puppeteer2MethodProps) => Promise<any>){
    return f
}


export const homepage = createPuppeteer2Method(async ({product,page,helpers}) => {
    // example 1
    // await (async ()=>{
    //     const {is} = helpers;
    //     if(is.nike()) {
    //         await page.goto("http://nike.com");
    //     }
    //     else {
    //         throw "unhandled link"
    //     }
    // })()

    // example 2 - preferred
    const {is} = helpers;
    if(is.nike()) {
        await page.goto("http://nike.com");
    }
    else {
        throw "unhandled link"
    }
})
