const { verify} = require("crypto");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require(".././models/Product")
const router = require('express').Router();

// CREATE
router.post("/",verifyTokenAndAdmin,async (req, res) => {
  const newProduct = new Product(req.body)

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json({
        msg : "product created successfully",
        data : saveProduct
     })
  } catch (error) {
    res.status(200).json({
        msg : "product created failed",
        data : error
     })
  }
})



// UPDATE
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    console.log("put product enter")  
    try {
        console.log("param id "+req.params.id)
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        console.log("updatedProduct: " + updatedProduct)
        res.status(200).json({msg : "product updated successfully",
      data : updatedProduct}); 
    } catch (error) {
      res.status(500).json({msg : "product updated failed",
      data : error});
    }
    
  })
  
  // DELETE
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try {
      await Product.findById(req.params.id)
      res.status(200).json({msg : "User has been deleted..."});
    } catch (err) {
      res.status(500).json({msg : err});
    } 
})
  
// GET USER - Search by admin for particular user
router.get("/find/:id",async (req,res)=>{
  try {
     //console.log("enter get product")
      const product = await Product.findById(req.params.id)
      res.status(200).json({
          msg : "get product successfully",
          data : product
      })
  } catch (error) {
      res.status(500).json({
          msg : "get product failed",
          data : error
      })
  }
  })
  
  //GET ALL USER :   
  router.get("/", async (req,res) =>{
      // URL : localhost:5000/api/products?new=true
      // what if pass query then get top 5 user
      const qNew = req.query.new;
      // URL : localhost:5000/api/products?category=true
      const qCategory = req.query.category;
      //console.log("query from get all : ",qCategory)
      try {
       let products;
       
       if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(1);
       }else if(qCategory){
        //console.log("enter category")
        products = await Product.find({
            categories : {
                $in : [qCategory]
            }
        })
       }else{
        products = await Product.find(); 
       }
       res.status(200).json({
          msg : "get all products successfully",
          data : products
      });
      } catch (error) {
          res.status(200).json({
              msg : "get all products failed",
              data : error
          })
      }
  })
  


module.exports = router