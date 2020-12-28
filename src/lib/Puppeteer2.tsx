import puppeteer, {Browser, Page} from "puppeteer";
import React, {FC, useEffect, useState} from "react";
import {createMenu} from "@7casa/clib22-helpers";
import {browserApp, puppeteerMethods} from "../helpers";

interface Puppeteer2AccountProps {
    name: string
    firstName:string
    lastName:string
    line1:string
    line2:string
    line3:string
    line4:string
    email:string
    password:string
}

export interface Puppeteer2ProductProps {
    link:string
    size:number
    id:string
    releaseDate?:string
    account:Puppeteer2AccountProps
}

interface Puppeteer2OptionsProxyProps {
    ipAddress:string
    port:string
    username:string
    password:string
}

interface Puppeteer2OptionProxyRotate {
    rotate:boolean
}
interface Puppeteer2OptionProxySticky {
    sticky:true
    session:"1"|"5"
}

type Puppeteer2OptionProxy = Puppeteer2OptionProxySticky | Puppeteer2OptionProxyRotate

interface Puppeteer2Options {
    headless:boolean
    proxy?: Puppeteer2OptionProxy
}

interface Puppeteer2ListMenuFunctionProp {
    cleanup: (data:any) => Promise<any>
    menu: string
}

type Puppeteer2ListMenuFunction = () => Puppeteer2ListMenuFunctionProp

interface Puppeteer2ListProps {
    menus: (string|Puppeteer2ListMenuFunction)[]
    authorise?: () => Promise<boolean>,
    getCode: (name:string) => () => Promise<string>
}

interface Puppeteer2Props {
    product:Puppeteer2ProductProps
    options: Puppeteer2Options
    getCode: (name:string) => () => Promise<string>
}


export function createPuppeteer2ListMenuFunction(f:Puppeteer2ListMenuFunctionProp){
    return () => f
}

function random(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createPuppeteer2List({menus,getCode}:Puppeteer2ListProps){
    const menu = createMenu("puppeteer")

    const isString = (f:any) : f is string => {
        return typeof f === "string"
    }
    const isFunction = (f:any) : f is Puppeteer2ListMenuFunction => {
        return typeof f !== "string"
    }

    return menus.filter(isString).map(f => {
        return menu.createMenuItem(f,async (product) => {
            const {
                callMethod
            } = createPuppeteer2({product,options:{headless:false, proxy: {sticky:true, session:"5"}},getCode})
            const result = await callMethod(f)
            const cleanup = menus.filter(isFunction).filter(m => m().menu === f)
            await Promise.all(cleanup.map(async c => {
                await c().cleanup(result)
            }))
        })
    })
}


export function createPuppeteer2({product,options,getCode}:Puppeteer2Props){


    let page:Page

    async function callMethod(method:string){
        const {page,browser} = await setup()

        const helpers = await (await import("./Puppeteer2Helpers")).default({page,product})
        const resp = puppeteerMethods({page,product,helpers,browser,getCode:getCode(method),method})
        delete require.cache[require.resolve("./Puppeteer2Helpers")]
        return resp
    }

    async function GetProxy(proxyType:Puppeteer2OptionProxy):Promise<Puppeteer2OptionsProxyProps>{

        console.log(proxyType,"proxyType")


        const adminProxies = ({
            ipAddress:"",
            port:"",
            username:"",
            password:""
        })

        return adminProxies

    }

    async function setup() {
        const url = new URL(product.link)
        const browserId = "browser-"+product.id
        const pageId = "page-"+product.id

        const proxy = options.proxy && await GetProxy(options.proxy)
        const _browserApp = await browserApp(url)

        const browser:Browser = window.puppeteer?.[browserId] || await puppeteer.launch({
            executablePath:"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
            headless:options?.headless,
            defaultViewport: null,
            args:[
                '--inprivate',
                _browserApp as string,
                "--disable-web-security",
                // `--proxy-server=${proxy?.ipAddress}:${proxy?.port}`,
                "--allow-file-access-from-files",
                "--allow-file-access",
            ]
        })

        console.log(proxy,"mate")

        // const context = await browser.createIncognitoBrowserContext();

        page = window.puppeteer?.[pageId] || (await browser.pages())[0];
        window.puppeteer[browserId] = browser
        window.puppeteer[pageId] = page


        if(proxy){
            await page.authenticate({
                username:proxy.username,
                password:proxy.password,
            })
        }

        browser.on('disconnected',async()=>{
            window.puppeteer[browserId] = null
            window.puppeteer[pageId] = null
        })

        return ({
            browser,page
        })
    }


    return ({
        callMethod
    })
}

