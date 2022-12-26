const { verify} = require("crypto");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require(".././models/User")
const router = require('express').Router();

// UPDATE
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
  console.log("put user enter")
    // check if password exists
  if(req.body.password){
     req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
   }
  
  // encrypt password
  // update password in mongo
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({msg : "user updated successfully",
    data : updatedUser}); 
  } catch (error) {
    res.status(500).json(error);
  }
  
})

// DELETE
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
  try {
    await User.findById(req.params.id)
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  } 
})

// GET USER - Search by admin for particular user
router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{
try {
    const user = await User.findById(req.params.id)
    const {password, ...others} = user._doc;
    res.status(200).json({
        msg : "get user successfully",
        data : others
    })
} catch (error) {
    res.status(500).json({
        msg : "get user failed",
        data : error
    })
}
})

//GET ALL USER : 

router.get("/",verifyTokenAndAdmin, async (req,res) =>{
    // URL : localhost:5000/api/user?new=true
    // what if pass query then get top 5 user
    const query = req.query.new;
    console.log("query from get all : ",query)
    try {
     const users = query ? await User.find().sort({_id:-1}).limit(5)
     : await User.find();    
     res.status(200).json({
        msg : "get all user successfully",
        data : users
    });
    } catch (error) {
        res.status(200).json({
            msg : "get all user failed",
            data : error
        })
    }
})

// GET USER STATS - Every month - total register user 
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router