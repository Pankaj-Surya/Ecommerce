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

// DELETE CART
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({msg : "Product has been deleted..."});
    } catch (err) {
      res.status(500).json({msg : err});
    } 
})
  
// GET CART
router.get("/find/:userId",verifyTokenAndAuthorization,async (req,res)=>{
  try {
     //console.log("enter get product")
      const Cart = await Cart.findOne({userId:req.params.userId})
      res.status(200).json({
          msg : "get Cart successfully",
          data : Cart
      })
  } catch (error) {
      res.status(500).json({
          msg : "get Cart failed",
          data : error
      })
  }
  })
  
//GET ALL CART:   
router.get("/",verifyTokenAndAdmin ,async (req,res) =>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
})
  


module.exports = router