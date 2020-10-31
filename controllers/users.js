const data       = require('../mocks/data'),
      jwt        = require("jsonwebtoken"),
      signature  =  "my_key_jwt",

      { User}    = require('../models');

function getAllUsers (req, res) {
    User.findAll().then(users => res.json(users))
}

function getUser(req, res) {
    const email = req.params.email;
    User.findOne({
        where: {
            email: email,
        }
    }).then(users => res.json(users))
}

function getUserById(req, res) {
    const userId = req.params.userId;
    User.findOne({
        where: {
            id: userId,
        }
    }).then(users => res.json(users))
}

function createUser (req, res) {
    const email = req.body.email;

    User.findOne({
        where: {
            email: email,
        }
    }).then(user => {
        if (user) {
            res.status(409).json("Este email ya tiene una cuenta de usuario creada");
			return;
        } else {
            User.create(req.body)
            .then(user => res.json(user))
            .catch(error => {
                res.status(400).json("Error validating input data", error);
            })
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function updateUser(req, res) {
    const email = req.params.email;

    User.findOne({
        where: {
            email: email,
        }
    }).then(user => {
        if (user) {
           user.update(req.body);
            return res.json(user);
        } else {
            res.status(409).json("Usuario no encontrado");
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function setAdmin(req, res) {
    const email = req.params.email;
    
    User.findOne({
        where: {
            email: email,
        }
    }).then(user => {
        if (user) {
            user.update({
                is_admin : true
            });
            res.status(400).json(user);
        } else {
            res.status(409).json("Usuario no encontrado");
        }
    }).catch(error => {
        console.log("Error:", error);
    });
}

function login(req, res) {
    const email    = req.body.email,
          password = req.body.password;

    User.findOne({
        where: {
            email: email,
            password : password
        }
    }).then(user => {
        if (user) {           
            token = jwt.sign(user.toJSON(), signature);
    
            res.json({token})
        } else {
            res.json({error: 'Usuario Invalido'}) 
        }

    }).catch(error => {
        console.log("Error:", error);
    });

}

function deleteUser(req, res) {
    const userId = req.params.userId;

    User.findOne({
        where: {
            id: userId,
        }
    }).then(user => {
        if (user) {
            user.destroy().then(user => {
                res.status(400).json("Usuario eliminado");
            });
         } else {
            return res.status(409).json("Usuario no encontrado");
         }
    }).catch(error => {
        console.log("Error:", error);
    });
}

module.exports = {
    getAllUsers,
    getUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    login,
    setAdmin
}
