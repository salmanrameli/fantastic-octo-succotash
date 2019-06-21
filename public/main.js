// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const isDev = require("electron-is-dev");

const Store = require('electron-store');
const store = new Store();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function stringToBool(val) {
  return (val + '').toLowerCase() === 'true';
}

function initWindow() {
  let winWidth = 1280
  let winHeight = 800
  let windowIsResizable
  let windowHasFrame = true

  if(store.get('winWidth') !== undefined && store.get('winHeight') !== undefined) {
    winWidth = store.get('winWidth')
    winHeight = store.get('winHeight')
  }

  if(store.get('windowIsResizable') === undefined) {
    windowIsResizable = true
  } else {
    windowIsResizable = store.get('windowIsResizable')
  }

  if(store.get('windowHasFrame') !== undefined) {
    windowHasFrame = store.get('windowHasFrame')
  }

  createWindow(winWidth, winHeight, windowIsResizable, windowHasFrame)
}

function createWindow (winWidth, winHeight, windowIsResizable, windowHasFrame) {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: parseInt(winWidth, 10),
    height: parseInt(winHeight, 10),
    resizable: stringToBool(windowIsResizable),
    titleBarStyle: stringToBool(windowHasFrame) ? "default" : "hidden",
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(`${__dirname}/renderer.js`),
    }
  })

  mainWindow.center()

  mainWindow.loadURL("https://www.youtube.com")

  const menu = Menu.buildFromTemplate(menubar)
  Menu.setApplicationMenu(menu)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) initWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
let menubar = [
  ...(process.platform === 'darwin' ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { label: 'Preferences', click() { mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`) } },  
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      { label: 'View Youtube', click() { mainWindow.loadURL("https://www.youtube.com") } },
      { type: 'separator' },
      process.platform === 'darwin' ? 
      { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(process.platform === 'darwin' ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(process.platform === 'darwin' ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
  }
]