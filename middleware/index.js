const jwt = require("jsonwebtoken"),
      signature =  "my_key_jwt";

const autentication = (req, res, next) => {
    let userParam = req.params.userId || '';
    console.log("RRR userParam",userParam)
    try {
        const token = req.headers.authorization.split(' ')[1],
            verifyToken = jwt.verify(token, signature);

        console.log("RRR verifyToken", verifyToken.id)


        if (verifyToken.is_active) {
            req.user_token = verifyToken;
            if(!userParam){
                next();
            } else if(userParam && userParam != verifyToken.id){
                console.log("RRR entre aca acaso?", userParam!='')

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
    is_admin
}
