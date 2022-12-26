const jwt = require("jsonwebtoken");

// check token validity
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    //console.log("authHeader -> ",authHeader);
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        //console.log("token -> ",token);
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) return res.status(403).json("Token is not valid!")
            req.user = user;
            next();
        })
    }else{
       return res.status(401).json("You are not authenticated! : token is not valid")
    }
}


// check req id with param id
const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();            
        }else{
            res.status(403).json("You are not allowed to do that! : authorize"); 
        }
    })
}


const verifyTokenAndAdmin = (req, res, next) =>{
    verifyToken(req, res, () =>{
        //console.log("isAdmin ",req.user.isAdmin)
        if(req.user.isAdmin){
            next();            
        }else{
            res.status(403).json("You are not admin to do that!"); 
        }
    })
}
module.exports = {verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin}