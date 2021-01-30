import {Puppeteer2ProductProps} from "./Puppeteer2";
import {Browser, Page} from "puppeteer";
import createPuppeteer2Helpers from "./Puppeteer2Helpers";

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;



export interface Puppeteer2MethodProps {
    page: Page
    product: Puppeteer2ProductProps
    browser?: Browser
    helpers: Awaited<ReturnType<typeof createPuppeteer2Helpers>>
    getCode: () => Promise<string>
}

function createPuppeteer2Method(f:(props:Puppeteer2MethodProps) => Promise<any>){
    return f
}

export default createPuppeteer2Method(async ({getCode,helpers,...rest}) => {
    const code = await getCode()
    const {..._helpers} = helpers
    const context = {...rest, ..._helpers}
    console.log(context,code)
    const resp = eval( `
        const {is,select,browser,product,page,get,faker,delay,type,press} = context;
        (async()=>{
            ${code}
        })()
    `)
    return resp
})