const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express(),
      { usersController, productsController, ordersController } = require('./controllers'),
      { autentication, autenticationAdmin }   =  require('./middleware');

app.use(bodyParser.json());

//Usuarios
app.post('/users', autenticationAdmin, usersController.createUser);
app.put('/users/:email', autenticationAdmin, usersController.updateUser);
app.patch('/setAdmin/:email', autenticationAdmin, usersController.setAdmin);
app.get('/users', autenticationAdmin, usersController.getAllUsers);
app.post('/login', usersController.login);
app.delete('/users/:userId', autenticationAdmin, usersController.deleteUser);

//Products
app.get('/products', autentication, productsController.getAllProducts);
app.get('/admin/products', autenticationAdmin, productsController.getAllProductsbyAdmin);
app.post('/admin/products', autenticationAdmin, productsController.createProduct);
app.put('/admin/products/:productId', autenticationAdmin, productsController.updateProduct);
app.delete('/admin/products/:productId', autenticationAdmin, productsController.deleteProduct)

//Order
app.get('/orders', autenticationAdmin, ordersController.getAllOrders); //agregar la info de usuarios
app.get('/clients/orders/:userId', autentication, ordersController.getOrdersByUser); //sólo la del usuario si no es admin
app.get('/admin/orders/:userId', autenticationAdmin, ordersController.getOrdersByUser);
app.post('/orders', autentication, ordersController.createOrder);
app.put('/orders/:orderId', autenticationAdmin, ordersController.updateOrder);
app.patch('/orders/status/:orderId', autenticationAdmin, ordersController.updateOrderStatus);
app.delete('/orders/:orderId', autenticationAdmin, ordersController.deleteOrder)
////app.get('/orders/historialStates/:orderId', autenticationAdmin, ordersController.getStates)

app.listen('3010', () => {
    console.log("server corriendo en el puerto 3010")
});
