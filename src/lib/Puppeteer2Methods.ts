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
    getCode: () => Promise<string>
}

function createPuppeteer2Method(f:(props:Puppeteer2MethodProps) => Promise<any>){
    return f
}

export default createPuppeteer2Method(async ({getCode,...rest}) => {
    const code = await getCode()
    const context = rest
    const codewrap = `
        (async()=>{
            ${code}
        })()
    `
    vm.createContext(context);
    const resp = await vm.runInNewContext(codewrap,context)
    return resp
})