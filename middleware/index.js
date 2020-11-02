const jwt = require("jsonwebtoken"),
      signature =  "my_key_jwt";

const autentication = (req, res, next) => {
    let userParam = req.params.userId || '';
    try {
        const token = req.headers.authorization.split(' ')[1],
            verifyToken = jwt.verify(token, signature);
        if (verifyToken.is_active) {
            req.user_token = verifyToken;
            if(!userParam){
                next();
            } else if(userParam && userParam != verifyToken.id){
                res.status(401).json("Unauthorized");
            } else {
                next();
            }
            
		} else {
            res.status(401).json("Unauthorized");
        }
    } catch(err) {
        res.json({'error': 'Problemas al validar usuario. Vuelva a iniciar sesión'}) 
    }
}

const autenticationAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const verifyToken = jwt.verify(token, signature);

        if (verifyToken.is_admin) {
            req.user_token = verifyToken;
            next();
		} else {
            res.status(401).json("Unauthorized");
        }
       
    } catch(err) {
        res.json({'error': 'Problemas al validar usuario. Vuelva a iniciar sesión'}) 
    }
}

const crearUsuarioAuth = (req, res, next) => {
    let verifyToken = {};

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];    
            verifyToken = jwt.verify(token, signature);    
        }

        if (verifyToken.is_admin) {
            req.user_token = verifyToken;
            next();
		} else {
            next();
        }
       
    } catch(err) {
        res.json({'error': 'Problemas al validar usuario. Vuelva a iniciar sesión'}) 
    }
}

const is_admin = (req, res, next) => {
    if (req.body.is_admin){
        req.body.is_admin = !req.body.is_admin;
    } else {
        req.body.is_admin = true
    }
    next();
}

module.exports = {
    autentication,
    autenticationAdmin,
    crearUsuarioAuth,
    is_admin
}
