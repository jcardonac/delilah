const UserModel     = require('./users'),
      ProductModel  = require('./products'),
      OrderModel    = require('./orders'),
      OrderDetailsModel    = require('./orders_details'),
      OrderStatesModel     = require('./orders_states'),

      db            = require('../database'),
      Sequelize     = require('sequelize'),
      User          = UserModel(db, Sequelize),
      Product       = ProductModel(db, Sequelize),
      Order         = OrderModel(db, Sequelize),
      OrderDetails  = OrderDetailsModel(db, Sequelize),
      OrderStates   = OrderStatesModel(db, Sequelize);


  //Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
//Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Order.belongsTo(User);

module.exports = {
  User,
  Product,
  Order,
  OrderDetails,
  OrderStates
}