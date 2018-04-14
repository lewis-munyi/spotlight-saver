const {app, BrowserWindow, dialog, ipcMain, shell, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')
let win
function createWindow () {
    // Create the browser window and specify the dimentions
    win = new BrowserWindow({width: 800, height: 600})
    // and load the index.html of the app.
    win.loadURL(url.format({
        //here's where we load the index.html file
        pathname: path.join(__dirname, './src/index.html'),
        protocol: 'file:',
        slashes: true
    }))
// Open the DevTools.
    win.webContents.openDevTools()
// Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    })
//removes default main menu for the app
    Menu.setApplicationMenu(null);
}
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    //no need to check for darwin (macOS) this is a windows only app
    app.quit()
})
app.on('activate', () => {
    if (win === null) {
    createWindow()
}
})