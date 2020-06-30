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

ipcMain.on('doCalculation', function(event, data) {
  var calcSummaryArray = [];
  var empArray = [];
  employee_table.findAll().then(employee_table_all => {
    for (var i=0; i<employee_table_all.length; i++) {
      empArray.push(employee_table_all[i].dataValues.id);
    }
    dts_table.findAll({
      where: {
        employee_id: empArray
      },
      order: [
            ['dts_date', 'ASC']
        ]
    }).then(dts_table_findIn => {
      console.log(dts_table_findIn[0].dataValues.id)
      var empDtsFound = false;
      var workdayCounter = 0;
      var workdayWeekendCounter = 0;


      var mealsCounter = 0;
      var transportCounter = 0;
      var attendanceCounter = 0;
      var ontimeCounter = 0;
      var awayCounter = 0;

      var totalWorktime = 0;

      for (var i=0; i<empArray.length; i++) {
        empDtsFound = false;
        for (var j=0; j<dts_table_findIn.length; j++) {
          if (empArray[i] == dts_table_findIn[j].dataValues.employee_id) {
            empDtsFound = true;
          }
        }

        if (empDtsFound) {
          mealsCounter = 0;
          transportCounter = 0;
          attendanceCounter = 0;
          ontimeCounter = 0;
          awayCounter = 0;

          totalWeekdayWorktime = 0;
          totalWeekendWorktime = 0;

          for(var j=0; j<dts_table_findIn.length; j++) {

            if (empArray[i] == dts_table_findIn[j].dataValues.employee_id) {
              let dtsId = dts_table_findIn[j].dataValues.id
              let workdayType = dts_table_findIn[j].dataValues.dts_workday;
              workdayCounter = doCountWorkday(workdayCounter, workdayType);

              let meals = dts_table_findIn[j].dataValues.dts_meal;
              mealsCounter = doCountMeals(mealsCounter, meals);

              let transport = dts_table_findIn[j].dataValues.dts_transport;
              transportCounter = doCountTransport(transportCounter, transport);

              let attendance = dts_table_findIn[j].dataValues.dts_attendance;
              attendanceCounter = doCountAttendance(attendanceCounter, attendance);

              let ontime = dts_table_findIn[j].dataValues.dts_ontime;
              ontimeCounter = doCountOntime(ontimeCounter, ontime);

              let away = dts_table_findIn[j].dataValues.dts_away;
              awayCounter = doCountOntime(awayCounter, away);

              let jobStart = dts_table_findIn[j].dataValues.dts_start;
              let jobFinish = dts_table_findIn[j].dataValues.dts_finish;
              if (workdayType == 'weekday') {
                totalWeekdayWorktime = totalWeekdayWorktime + doCalculateWorktime(jobStart, jobFinish);

                // console.log('id: %s, job start: %s, job finish %s, duration: %s', dtsId, jobStart, jobFinish, dtsSeconds/3600 )
              } else {
                
                totalWeekendWorktime = totalWeekendWorktime + doCalculateWorktime(jobStart, jobFinish);
              }
              
            }

          }
          console.log('employee id: %s , weekday: %s', empArray[i], workdayCounter);
          console.log('meals count: %s', mealsCounter)
          console.log('transport count: %s', transportCounter)
          console.log('attendance count: %s', attendanceCounter)
          console.log('ontime count: %s', ontimeCounter)
          console.log('away count: %s', awayCounter)
          console.log('total weekday worktime: %s', totalWeekdayWorktime)
          console.log('total weekday overtime: %s', (totalWeekdayWorktime)-(9*21))
          console.log('total weekend overtime: %s', (totalWeekendWorktime))
          var minusTime = 0;
          if ((totalWeekdayWorktime) > (9*21)) {
            console.log('total minus time: 0')
          } else {
            minusTime = (9*21)-(totalWeekdayWorktime)
            console.log('total minus time: %s', minusTime)
          }

          var calcSummary = {
            employee_id: empArray[i],
            total_weekday: workdayCounter,
            total_meals: mealsCounter,
            total_transport: transportCounter,
            total_attendance: attendanceCounter,
            total_ontime: ontimeCounter,
            total_away: awayCounter,
            total_weekday_overtime: (totalWeekdayWorktime)-(9*21),
            total_weekend_overtime: totalWeekendWorktime,
            total_minus: minusTime
          }
          calcSummaryArray.push(calcSummary);
        } else {
          /* EMP HAS NO DTS */
          var calcSummary = {
            employee_id: empArray[i],
            total_weekday: 0,
            total_meals: 0,
            total_transport: 0,
            total_attendance: 0,
            total_ontime: 0,
            total_away: 0,
            total_weekday_overtime: 0,
            total_weekend_overtime: 0,
            total_minus: 0
          }
          calcSummaryArray.push(calcSummary);
        }
      }
      console.log(calcSummaryArray)
    })
  })
});

function doCalculateWorktime (jobStart, jobFinish) {

  var dayConst = '02';

  var dtsJobStart = new Date('November ' + dayConst + ', 2017 ' + jobStart + ':00');
  var dtsJobFinish = new Date('November ' + dayConst + ', 2017 ' + jobFinish + ':00');

  if (dtsJobFinish.getTime() < dtsJobStart.getTime()) {
    dayConst = '03'
    dtsJobFinish = new Date('November ' + dayConst + ', 2017 ' + jobFinish + ':00');
  }

  var dtsSeconds = (dtsJobFinish.getTime() - dtsJobStart.getTime()) / 1000;
  return (dtsSeconds/3600);
}

function doCountOntime (awayCounter, away) {
  if (away == 1) {
    awayCounter++;
  }
  return awayCounter;
}

function doCountOntime (ontimeCounter, ontime) {
  if (ontime == 1) {
    ontimeCounter++;
  }
  return ontimeCounter;
}

function doCountAttendance (attendanceCounter, attendance) {
  if (attendance == 1) {
    attendanceCounter++;
  }
  return attendanceCounter;
}

function doCountTransport (transportCounter, transport) {
  if (transport == 1) {
    transportCounter++;
  }
  return transportCounter;
}

function doCountMeals (mealsCounter, meals) {
  if (meals == 1) {
    mealsCounter++;
  }
  return mealsCounter;
}

function doCountWorkday (workdayCounter, workdayType) {
  if (workdayType == 'weekday') {
    workdayCounter++;
  } else if (workdayType == 'weekend') {

  }
  return workdayCounter;
}

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
