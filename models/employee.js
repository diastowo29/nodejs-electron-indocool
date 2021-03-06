module.exports = (sequelize, type) => {
    return sequelize.define('employee_master', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        working_domicile: type.STRING(510),
        employee_status: type.STRING(510),
        employee_name: type.STRING(510),
        place_of_birth: type.STRING(510),
        date_of_birth: type.DATE,
        nik: type.STRING(510),
        kk: type.STRING(510),
        npwp: type.STRING(510),
        marital_status: type.STRING(510),
        mother_name: type.STRING(510),
        bpjs_tk: type.STRING(510),
        bpjs_ks: type.STRING(510),
        address: type.STRING(510),
        email_address: type.STRING(510),
        phone_number: type.STRING(510),
        division: type.STRING(510),
        join_date: type.DATE,
        job_position: type.STRING(510),
        basic_salary: type.STRING(510),
        meal: type.STRING(510),
        transport: type.STRING(510),
        attendance: type.STRING(510),
        ontime: type.STRING(510),
        hse: type.STRING(510),
        productivity: type.STRING(510),
        fix: type.STRING(510),
        overtime: type.STRING(510)
    })
}