const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require(".././models/Cart")
const router = require('express').Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const saveCart = await newCart.save();
        res.status(200).json({
            msg: "Cart created successfully",
            data: saveCart
        })
    } catch (error) {
        res.status(200).json({
            msg: "Cart created failed",
            data: error
        })
    }
})



// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log("put product enter")
    try {
        console.log("param id " + req.params.id)
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        console.log("updatedCart: " + updatedCart)
        res.status(200).json({
            msg: "Cart updated successfully",
            data: updatedCart
        });
    } catch (error) {
        res.status(500).json({
            msg: "Cart updated failed",
            data: error
        });
    }

})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        console.log("enter get cart")
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json({
            msg: "get cart successfully",
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            msg: "get cart failed",
            data: error
        })
    }
})

//GET ALL   
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router