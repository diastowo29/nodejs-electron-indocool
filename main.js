// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const ipcMain = require('electron').ipcMain;
const { employee_table } = require('./sequelize')
const Sequelize = require('sequelize')

var mainWindow;
// console.log(process.env.PATH)

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('do_login', function(event, data) {
  mainWindow.loadFile('dashboard.html')
});

ipcMain.on('emp_master', function(event, data) {
  console.log('emp')
});

ipcMain.on('input_dts', function(event, data) {

});

ipcMain.on('employee_list', function(event, data) {
  employee_table.findAll().then(employee_table_find => {
    mainWindow.webContents.send('employee_list', employee_table_find);
  })
});

ipcMain.on('create_employee', function (event, data) {
  var employee_data = data;
  employee_table.findAll({
    where: {
      nik: employee_data.nik
    }
  }).then(employee_table_find => {
    if (employee_table_find.length > 0) {
      mainWindow.webContents.send('update_finish', false);
    } else {
      employee_table.create(employee_data).then(employee_table_create => {
        mainWindow.webContents.send('update_finish', true);
      })
    }
  })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
