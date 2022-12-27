const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require(".././models/Order")
const router = require('express').Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json({
            msg: "Order created successfully",
            data: saveOrder
        })
    } catch (error) {
        res.status(200).json({
            msg: "Order created failed",
            data: error
        })
    }
})



// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    //console.log("put  enter")  
    try {
        //console.log("param id "+req.params.id)
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        console.log("updatedOrder: " + updatedOrder)
        res.status(200).json({
            msg: "Order updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            msg: "Order updated failed",
            data: error
        });
    }

})

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET ORDERS By USER
router.get("/find/:userId", async (req, res) => {
    try {
        console.log("enter get orders")
        const orders = await Order.findOne({ userId: req.params.userId })
        res.status(200).json({
            msg: "get order successfully",
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            msg: "get order failed",
            data: error
        })
    }
})

//GET ALL   
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            msg: "get all orders successfully",
            data: orders
        });
    } catch (err) {
        res.status(500).json(err);
    }
})


// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    // last 2 month
    // dec  
    const date = new Date();
    // nov
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    // oct
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(err);
    }
})


module.exports = router