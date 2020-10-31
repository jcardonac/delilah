module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
          },
          name: type.STRING,
          email: type.STRING,
          password: type.STRING,
          phone:  type.STRING,
          shipping_address:  type.STRING,
          is_admin : type.BOOLEAN,
          is_active: type.BOOLEAN
    },{
        timestamps: false
    })
}

//https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz?utm_content=69762743&utm_medium=social&utm_source=twitter