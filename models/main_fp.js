module.exports = (sequelize, type) => {
    return sequelize.define('main_fp', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        fp_json: type.STRING(510),
        fp_count: type.STRING(510),
        fp_date: type.DATE
    })
}