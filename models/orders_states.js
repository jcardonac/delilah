module.exports = (sequelize, type) => {
    return sequelize.define('order_states', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
          },
        order_id: type.INTEGER,
        status_name: type.STRING,
        date: type.DATE,
    },{
        timestamps: false,
        underscored: true

    })
}
