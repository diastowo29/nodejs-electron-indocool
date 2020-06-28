// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const ipcMain = require('electron').ipcMain;
const { employee_table, 
  mainfp_table,
  dts_table } = require('./sequelize')

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

ipcMain.on('save_dts', function(event, data) {
  dts_table.create(data).then(dts_table_create => {
    var dtsElement = {
      dts_job_number: data.dts_job_number,
      dts_date: data.dts_date,
      dts_start: data.dts_start,
      dts_finish: data.dts_finish,
      dts_workday: data.dts_workday,
      dts_job_id: dts_table_create.dataValues.id
    }
    mainWindow.webContents.send('save_dts', dtsElement);
  })
});

ipcMain.on('delete_dts', function(event, data) {
  dts_table.destroy({
    where: {
      id: data
    }
  }).then(dts_table_destroy => {
    mainWindow.webContents.send('delete_dts', data);
  })
})

ipcMain.on('create_mainfp', function(event, data) {
  var mainfp_element = {
    fp_date: data.fp_date,
    fp_count: data.fp_count
  }
  mainfp_table.findAll({
    where: {
      fp_date: data.fp_date + ' 00:00:00'
    }
  }).then(mainfp_table_find => {
    if (mainfp_table_find.length > 0) {
      mainWindow.webContents.send('mainfp_failed', false);
    } else {
      mainfp_table.create(data).then(mainfp_table_create => {
        mainWindow.webContents.send('mainfp_finish', mainfp_element);
      })
    }
  })
});

ipcMain.on('mainfp_menu', function(event, data) {
  mainfp_table.findAll().then(mainfp_table_find => {
    console.log(mainfp_table_find)
    mainWindow.webContents.send('mainfp_menu', mainfp_table_find);
  });
});

ipcMain.on('dts_menu', function(event, data) {
  employee_table.findAll().then(employee_table_find => {
    mainWindow.webContents.send('dts_menu', employee_table_find);
  });
});

ipcMain.on('employee_menu', function(event, data) {
  employee_table.findAll().then(employee_table_find => {
    mainWindow.webContents.send('employee_menu', employee_table_find);
  });
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
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
