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

export default createPuppeteer2Method(async ({getCode,helpers,...rest}) => {
    const code = await getCode()
    const {..._helpers} = helpers
    // function delay(time:number) {
    //     return new Promise(function(resolve) {
    //         // @ts-ignore
    //         setTimeout(resolve, time)
    //     });
    // }
    const l = console
    const context = {setTimeout}
    console.log(context,code)
    // eval("console.log(context,333)")
    //
    // const resp = eval( `
    //     const {is,setTimeout,select,browser,product,page,get,faker,delay,type} = context;
    //
    //     (async()=>{
    //         ${code}
    //     })()
    // `)
    // return resp

    const codewrap = `
    async function run(){
        await new Promise(resolve => setTimeout(resolve, 5000))
    }
    run.apply(this)
    `
    const resp = await vm.runInNewContext(codewrap,vm.createContext({setTimeout,console}),{displayErrors:true,filename:"vm-error.js",timeout:5000,})
    return resp
})