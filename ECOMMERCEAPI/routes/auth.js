const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {
    // pass user data in user obj 
    const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
  })
  
  try {
    // save in mongodb
    const Saveduser = await newUser.save();
    console.log(Saveduser)
    res.status(201).json({msg : "user Register successfully",
            data : Saveduser,
            }); 
  } catch (err) {
    res.status(500).json(err);
}
})

// LOGIN - when  logged in -> created token using jwt
router.post("/login", async (req, res) => {
    try{
        // find user in db 
        
        //console.log("USER FROM REQ BODY",req.body.username)

        const user = await User.findOne(
            {
                email : req.body.email
            }
        );

        //console.log("user from login ", user);

         !user && res.status(401).json("Wrong User Name");

        // hasing a password
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        // decrypt password 
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // password -> req.body
        const inputPassword = req.body.password;
        //originalPassword != inputPassword && res.status(401).json("Wrong Password");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
          {expiresIn:"3d"}
        );
  
        // passing only data not password
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }

})

module.exports = router