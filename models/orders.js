module.exports = (sequelize, type) => {
    return sequelize.define('order', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
          },
        user_id: type.INTEGER,
        date: type.DATE,
        description: type.STRING,
        total_cost: type.STRING,
        payment_method:  type.STRING,
        status: type.INTEGER
    },{
        timestamps: false,
        underscored: true
    })
}

//shiping
//status