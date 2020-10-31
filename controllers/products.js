const { Product } = require('../models');

function getAllProducts(req, res) {
    Product.findAll({
        where: {
            is_available: true,
        }
    }).then(products => res.json(products))
}

function getAllProductsbyAdmin(req, res) {
    Product.findAll().then(products => res.json(products))
}

const getProductById = async (id) => {
    Product.findOne({
        where: {
            id: id,
        }
    }).then(product => {
        if (product) {
           return product.toJSON()
        } else {
             return {
                error: 'No se encontró producto'
            };
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function updateProduct(req, res){
    const productId = req.params.productId;

    Product.findOne({
        where: {
            id: productId,
        }
    }).then(product => {
        if (product) {
            product.update(req.body);
            return res.json(product);
         } else {
             res.status(409).json("Producto no encontrado");
         }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function deleteProduct(req, res){
    const productId = req.params.productId;

    Product.findOne({
        where: {
            id: productId,
        }
    }).then(product => {
        if (product) {
            return product.destroy();
         } else {
            return res.status(409).json("Producto no encontrado");
         }
    }).then(() => { return res.status(400).json("Producto eliminado");}).catch(error => {
        console.log("Error:", error);
    });
}

function createProduct(req, res) {
    Product.create(req.body)
        .then(product => res.json(product))
}

module.exports = {
    getAllProducts,
    getAllProductsbyAdmin,
    createProduct,
    deleteProduct,
    getProductById,
    updateProduct
}
