const users = [
    {
        "password": "321",
        "name": "Gustavo Ramirez",
        "email": "gustavo@gmail.com",
        "phone":  "3003245874",
        "shipping_address" : "Kra 20",
        "is_admin":true,
        "is_active": true
    }
],
products = [
    {
        "name": "Hamburguesa",
        "description": "Pan con tomate lechuga y carne",
        "price": 20000,
        "image": " ",
        "is_available": true
    }
],

orders = [
    {
        "description": "Pedido de una hamburguesa",
        "total_cost": 24000,
        "payment_method":  "Efectivo",
        "details" :[
            {
                "product_id" : 1,
                "product_amount" : 2
            },
            {
                "product_id" : 2,
                "product_amount" : 2
            }
        ]
    }
];



module.exports = { 
    users
};

