import {app, BrowserWindow, dialog, Menu} from 'electron'
import { autoUpdater } from "electron-updater"

const dev  =process.env.NODE_ENV === "development"
const test =process.env.NODE_ENV === "test"
const prod = process.env.NODE_ENV === "production"
console.log(dev || test,"bluboyt")

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
        },
    })
    console.log(process.env.NODE_ENV)

    if(dev||test){
    } else {

        const menu = Menu.buildFromTemplate([])
        Menu.setApplicationMenu(menu)
    }

    if(dev){
        win.loadURL("http://localhost:3000")
    } else if (test) {
        win.loadURL("http://localhost:5000")
    } else {
        win.loadFile("build/index.html")
    }
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
