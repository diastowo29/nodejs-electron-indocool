const Sequelize = require('sequelize')
const employeeModel = require('./models/employee')

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

sequelize_db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    })

module.exports = {
    employee_table
}