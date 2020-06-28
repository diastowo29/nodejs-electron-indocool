module.exports = (sequelize, type) => {
    return sequelize.define('dts_master', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        employee_id: type.INTEGER,
        dts_date: type.DATE,
        dts_start: type.STRING(10),
        dts_finish: type.STRING(10),
        dts_job_number: type.STRING(100),
        dts_job_desc: type.STRING(200),
        dts_workday: type.STRING(50),
        dts_meal: type.BOOLEAN,
        dts_transport: type.BOOLEAN,
        dts_attendance: type.BOOLEAN,
        dts_ontime: type.BOOLEAN,
        dts_production: type.BOOLEAN,
        dts_housing: type.BOOLEAN,
        dts_away: type.BOOLEAN,
    })
}