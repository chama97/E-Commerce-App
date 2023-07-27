const router = require("express").Router();
const  Order  = require("../model/order.model");
const authenticateToken = require('../middleware/authFilter');


// Purchase Order
router.post('/save', authenticateToken, async (req, res) => {
    try {
        const { customerId ,itemId, qty, price,method } = req.body;

        const order = new Order({
            customerId,
            itemId,
            qty,
            price,
            method,
            status:1
        });
        await order.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


// Get All Orders by status
router.get('/all', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ status: 1 });

        res.status(200).json({ message: 'Success', data: orders });
    } catch (err) {
        console.error('Error retrieving orders:', err);
        res.status(500).json({ message: 'Failed to retrieve orders' });
    }
});



module.exports = router