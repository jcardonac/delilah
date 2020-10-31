const { Order, OrderDetails, OrderStates, Product, User } = require('../models');
const states2 = [{ id: 1, name: 'Confirmada'}, { id: 2, name: 'En preparación'},
 { id: 3, name: 'En Camino'}, { id: 1, name: 'Entregado'}];
 const states = ['Confirmada', 'En preparación', 'En Camino', 'Entregado'];

 async function getAllOrders(req, res) {
     let orders;
     try {
        orders = await Order.findAll({include: [User]})
        res.status(400).json(orders);
    }
    catch  (error) {
		next(new Error(error));
	}
}

function getOrdersByUser(req, res) {
    const userId    = req.params.userId;
    Order.findAll({
        where: {
            user_id: userId,
        }
    }).then(orders => {
        if (orders && orders.length) {      
            res.json({orders})
        } else {
            res.json({error: 'No se econtraron ordenes'}) 
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

async function getProductById (id, productAmount) {
    try {
        return await Product.findOne({
            where: {
                id: id,
            }
        }).then(product => {
            if (product) {
              return parseInfo(product, productAmount)
            } else {
                 return {
                    error: 'No se encontró producto'
                };
            }
        }).catch(error => {
            console.log("Error:", error);
        })
    }
    catch  (error) {
		next(new Error(error));
	}
}
async function createOrder  (req, res, next) {
    let totalCost   = 0, 
        productInfo = "", 
        userId      = req.user_token.id,
        {details, payment_method} = req.body,
        productDetails,
        dateNow = new Date();

    try {
        productDetails = await Promise.all(
            details.map((product) => {
                return getProductById(product.product_id, product.product_amount)
            })
        );

        if (productDetails.some((product) => !product.is_available)) {
			res.status(403).json(product.name," No está disponible");
        } else {
            productDetails.forEach((product) => {
                totalCost += product.totalProduct;
                productInfo += product.descProduct;
            })

        }
    } catch (error) {
		next(new Error(error));
    }

    Order.create({
        user_id: userId,
        date: dateNow,
        payment_method: payment_method,// agregar total y desc
        status: 1,
        total_cost : totalCost,
        description: productInfo
    }).then(order => {
        productDetails.forEach((product) => {
            OrderDetails.create({
                order_id : order.id,
                product_id : product.id,
                product_amount: product.amount
            })
        });
        OrderStates.create({
            order_id : order.id,
            status_name: "Confirmada",
            date: dateNow
        }).catch (function(error) {
            console.error(error);
        })
        res.json(order)
    }).catch (function(error) {
        console.error(error);
    })
}
function parseInfo(productInfo, productAmount){
    let  totalProduct  = productInfo.price * productAmount,
         descProduct   = ` ${productAmount} - ${productInfo.name}`;

    return  {
        id: productInfo.id, 
        name:productInfo.name, 
        totalProduct, descProduct, 
        is_available : productInfo.is_available, 
        amount: productAmount
    }
}

/**
 * Actualiza el estado de la orden. Posibles estados de la orden
 * 1. confirmado, 2. En preparación, 3. En Camino, 4. Entregado
 * @param {*} res 
 * @param {*} req 
 */
function updateOrderStatus(req, res){
    const orderId = req.params.orderId,
          status = Number(req.body.status);

    Order.findOne({
        where: {
            id: orderId,
        }
    }).then(order => {
        if (order) {
            order.update(req.body).
            then(
                order=> {
                    OrderStates.create({
                        order_id : order.id,
                        status_name: states[status-1],
                        date: new Date()
                    }).catch (function(error) {
                        console.error(error);
                    })
                }
            );
            return res.json(order);
        } else {
            res.status(409).json("Orden no encontrada");
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function updateOrder(req, res) {
    const orderId = req.params.orderId;

    Order.findOne({
        where: {
            id: orderId,
        }
    }).then(order => {
        if (order) {
            order.update(req.body);
            return res.json(order);
        } else {
            res.status(409).json("Orden no encontrada");
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function deleteOrder(req, res) {
    const orderId = req.params.orderId;

    Order.findOne({
        where: {
            id: orderId,
        }
    }).then(order => {
        if (order) {
                OrderDetails.destroy({
                    where: {
                        order_id : orderId,
                    }
                });
                OrderStates.destroy({
                    where: {
                        order_id : orderId,
                    }
                });
                order.destroy();
                res.status(400).json("Orden eliminada");
         } else {
            return res.status(409).json("Orden no encontrada");
         }
    }).catch(error => {
        console.log("Error:", error);
    });
}

module.exports = {
    deleteOrder,
    getAllOrders,
    getOrdersByUser,
    createOrder,
    updateOrder,
    updateOrderStatus
}
