const Sequelize = require('sequelize')
const employeeModel = require('./models/employee')
const mainfpModel = require('./models/main_fp')
const dtsModel = require('./models/dts')

var sequelize_db;

if (process.env.DATABASE_URL === undefined) {
	sequelize_db = new Sequelize('isc_master', 'root', '', {
	  host: 'localhost',
	  dialect: 'mysql'
	});
} else {
	sequelize_db = new Sequelize(process.env.DATABASE_URL, {
	  dialectOptions: {
	    ssl: {
	      require: true,
	      rejectUnauthorized: false,
	    },
	    keepAlive: true,        
	  },      
	  ssl: true
	})
}

const employee_table = employeeModel(sequelize_db, Sequelize)
const mainfp_table = mainfpModel(sequelize_db, Sequelize)
const dts_table = dtsModel(sequelize_db, Sequelize)

sequelize_db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    employee_table.findAll({
    	where: {
    		id: 1
    	}
    }).then(employee_table_find => {
    	console.log(employee_table_find.length);
    })
})

module.exports = {
    employee_table,
    mainfp_table,
    dts_table
}