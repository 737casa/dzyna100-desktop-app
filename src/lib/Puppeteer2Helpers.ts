import {Page} from "puppeteer";
import {Puppeteer2ProductProps} from "./Puppeteer2";

export interface Puppeteer2HelperProps {
    page?: Page
    product: Puppeteer2ProductProps
}

const d = (t:number) => new Promise((resolve) => {
    setTimeout(() => {
        console.log("geat3333")
        resolve(true)
    },t)
})

export default async function createPuppeteer2Helpers({page,product}:Puppeteer2HelperProps){
    const faker2 = (await import("./faker2")).default()

    const is = {
        nike(){
            return product.link.includes("nike.com")
        },
    }
    return ({
        faker:faker2,
        get: {
            releaseDate(text:string){
                if(is.nike()){
                    const [_1,my,_2,time] = text.split(" ")
                    const [day,month] = my.split("/")
                    const [hour,min] = time.split(":")
                    const d = new Date()
                    d.setMonth(Number(month)-1)
                    d.setDate(Number(day))
                    d.setHours(Number(hour))
                    d.setMinutes(Number(min))
                    d.setSeconds(0)
                    const str = d.toISOString().substr(0,16)
                    return str
                } else {
                    throw "can't get release for unknown store"
                }
            },
        },
        is,
        ...(page && {
            outlook: {
                select: {
                    async month(number:number){
                        console.log(number,"peakabook")
                        switch (number) {
                            case 0: {
                                return await page.keyboard.press("J")
                            }
                            case 1: {
                                return await page.keyboard.press("F")
                            }
                            case 2: {
                                return await page.keyboard.press("M")
                            }
                            case 3: {
                                return await page.keyboard.press("A")
                            }
                            case 4:{
                                await page.keyboard.press("M")
                                return await page.keyboard.press("M")
                            }
                            case 5:{
                                await page.keyboard.press("J")
                                return await page.keyboard.press("J")
                            }
                            case 6: {
                                await page.keyboard.press("J")
                                await page.keyboard.press("J")
                                return await page.keyboard.press("J")
                            }
                            case 7: {
                                await page.keyboard.press("A")
                                return await page.keyboard.press("A")
                            }
                            case 8: {
                                return await page.keyboard.press("S")
                            }
                            case 9:{
                                return await page.keyboard.press("O")
                            }
                            case 10: {
                                return await page.keyboard.press("n")
                            }
                            case 11: {
                                return await page.keyboard.press("d")
                            }
                            default: {
                                console.log("outlook/select/month: did not receive valid month -",number)
                            }
                        }
                    },
                }
            },
            async delay(time?:number){
                await page.waitForTimeout(time || window.random.number(750,5000))
            },
            exists: {
                async text({value,attr,tag}:{value:string,tag:string,attr:string}){
                    try {
                        await page.waitForXPath(`//${tag || "*"}[translate(${attr}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`,{visible: true,timeout:8000});
                        return true
                    } catch (e) {
                        return false
                    }
                },
            },
            type: {
                async text({value,text,attr,delay}:{value:string,text:string,attr:string,delay?:number}){
                    await page.waitForXPath(`//*[translate(@${attr}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`,{visible: true});
                    await (await page.$x(`//*[translate(@${attr}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`))[0].type(text,{delay:window.random.number(50,500)})
                },
            },
            click: {
                async tag({tag}:{tag:string}){
                    await page.waitForXPath(`//${tag}`,{visible: true,});
                    await (await page.$x(`//${tag}`))[0].click({delay:window.random.number(500,3000)})
                },
                async textExact({text,tag}:{tag?:string,text:string}){
                    await page.waitForXPath(`//${tag || "*"}[text()='${text}']`,{visible: true});
                    await (await page.$x(`//${tag || "*"}[text()='${text}']`))[0].click()
                },
                async text({value,attr,tag}:{value:string,attr?:string,tag?:string}){
                    console.log(attr || 33,"bink")
                    await page.waitForXPath(`//${tag || "*"}[translate(${attr || "text()"}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`,{visible: true});
                    await (await page.$x(`//${tag || "*"}[translate(${attr || "text()"}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`))[0].click()
                },
                async containTextExact({text,tag,attr}:{text:string,tag:string,attr:string}){
                    await page.waitForXPath(`//${tag}[contains(${attr}, '${text}')]`, {visible:true})
                    await (await page.$x(`//${tag}[contains(${attr}, '${text}')]`))[0].click()
                }
            },
            select(){

            },
            press: {
                async tab(){
                    await page.keyboard.press("Tab");
                },
                async enter(){
                    await page.keyboard.press("Enter",{delay:window.random.number(750,3000)})
                },
                async type(text:string){
                    await page.keyboard.type(text,{delay:window.random.number(750,2000)})
                }
            }
        })
    })
}