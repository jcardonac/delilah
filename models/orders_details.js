module.exports = (sequelize, type) => {
    return sequelize.define('order_details', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
          },
        order_id: type.INTEGER,
        product_id: type.INTEGER,
        product_amount: type.INTEGER
    },{
        timestamps: false,
        underscored: true

    })
}
