module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
          },
          name: type.STRING,
          description: type.STRING,
          price: type.INTEGER,
          image:  type.STRING,
          is_available: type.BOOLEAN
    },{
        timestamps: false,
        underscored: true

    })
}
