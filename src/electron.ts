/// <reference types="./window" />
import {app, BrowserWindow, dialog, Menu} from 'electron'
import { autoUpdater } from "electron-updater"

const dev = process.env.NODE_ENV === "development"
const prod = process.env.NODE_ENV === "production"
const test = process.env.NODE_ENV === "test"


async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: dev || test,
            nodeIntegration: true,
        },
    })

    if(prod){
        const menu = Menu.buildFromTemplate([])
        Menu.setApplicationMenu(menu)
    }

    if(prod){
        await win.loadFile("build/index.html")
    } else if(test) {
        await win.loadURL("http://localhost:5000")
    } else {
        await win.loadURL("http://localhost:3000")
    }

    // win.loadURL("http://localhost:3000")
}

app.on('ready', function()  {
    setTimeout(() => {
        autoUpdater.checkForUpdatesAndNotify();
    },10000)
});

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
