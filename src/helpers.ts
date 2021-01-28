import {Puppeteer2MethodProps} from "./lib/Puppeteer2Methods";
import {BrowserWindow, Menu,remote} from "electron";

const dev = process.env.NODE_ENV === "development"
const prod = process.env.NODE_ENV === "production"
const test = process.env.NODE_ENV === "test"


export async function headless(){
    return prod
}

export async function puppeteerMethods(data:Puppeteer2MethodProps&{method:string}) {
    if(test||prod){
        const mod = await (await import("./lib/Puppeteer2Methods")).default(data)
        delete require.cache[require.resolve("./lib/Puppeteer2Methods")]
        return mod
    } else {
        const {method, ...rest} = data
        const mod:any = await import("./lib/Puppeteer2Methods.dev")
        delete require.cache[require.resolve("./lib/Puppeteer2Methods.dev")]
        return await mod[method](rest)
    }
}

export async function browserApp(data:any) {
    return prod ? `--app=${data}` : ""
}


export async function appTitle() {
    const t = (dev && "Dev") || (test && "Test") || ""
    const title = "Dzyna100 SDK " +t
    return title
}


export async function adminMenus(){
    if(prod||test){
        return window.api.get("users","","id","==",window.auth.currentUser?.email)().then((f:any) => {
            return f[0].admin
        })
    } else {
        return Promise.resolve(true)
    }
}

export async function electronLoadUrl(win:BrowserWindow){

    if(prod){
        win.loadFile("build/index.html")
    } else if(test) {
        win.loadURL("http://localhost:5000")
    } else {
        win.loadURL("http://localhost:3000")
    }
}
//
// export async function electronSetMenu(){
//     if(prod){
//         const menu = Menu.buildFromTemplate([])
//         Menu.setApplicationMenu(menu)
//     }
// }

export function getLid(){
    return window.auth.currentUser?.email || ""
}