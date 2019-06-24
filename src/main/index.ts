/**
 * Helpful links
 * - https://github.com/electron/electron-quick-start/blob/master/main.js
 * - https://github.com/sindresorhus/electron-boilerplate/blob/master/index.js
 */

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Disable security warnings for development
if (isDevelopment) {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'
} else {
  // Uncomment this before publishing your first version.
  // It's commented out as it throws an error if there are no published versions.
  const FOUR_HOURS = 1000 * 60 * 60 * 4
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, FOUR_HOURS)

  autoUpdater.checkForUpdates()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden',
    center: true,
    width: 1280,
    height: 720,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (isDevelopment) {
    // and load localhost for HMR
    mainWindow.loadURL(
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    )
    // // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
