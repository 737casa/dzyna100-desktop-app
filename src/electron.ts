/// <reference types="./window" />
import {app, BrowserWindow, dialog, Menu} from 'electron'
import { autoUpdater } from "electron-updater"
import {electronLoadUrl} from "./helpers";


async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
        },
    })

    electronLoadUrl(win)

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
