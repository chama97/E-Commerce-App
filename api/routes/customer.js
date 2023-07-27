const router = require("express").Router();
const  Customer  = require("../model/customer.model");
const authenticateToken = require('../middleware/authFilter');


// Create New Customer
router.post('/save', authenticateToken, async (req, res) => {
    try {
        const { name ,email, nid, address, status } = req.body;
        console.log(name, email, nid, address, status)

        const customer = new Customer({
            name,
            email,
            nid,
            address,
            status
        });
        await customer.save();
        res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


// Update Customer By ID 
router.put('/update/:id', authenticateToken, async (req, res) => {
    const customerId = req.params.id;
    const { name, email, nid, address, status } = req.body;
    try {
        const customer = await Customer.findOne({ id: customerId });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        customer.name = name;
        customer.email = email;
        customer.nid = nid;
        customer.address = address;
        customer.status = status;
        await customer.save();
        res.json({ message: 'Customer updated successfully' });
    } catch (err) {
        console.error('Error updating customer:', err);
        res.status(500).json({ message: 'Failed to update customer' });
    }
});


// Get All Customers by status Using Pagination
router.get('/all', authenticateToken, async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        
        if (isNaN(offset) || isNaN(limit)) {
            return res.status(400).json({ message: 'Invalid offset or limit values' });
        }
        const customers = await Customer.find({ status: 1 })
            .skip(offset)
            .limit(limit);

        res.status(200).json({ message: 'Success', data: customers });
    } catch (err) {
        console.error('Error retrieving customers:', err);
        res.status(500).json({ message: 'Failed to retrieve customers' });
    }
});


// Get Customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
    const customerId = req.params.id;
    try {
        const customer = await Customer.findOne({ id: customerId });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Success', data: customer });
    } catch (err) {
        console.error('Error retrieving customer:', err);
        res.status(500).json({ message: 'Failed to retrieve customer' });
    }
});


// Delete Customer By ID 
router.put('/remove', authenticateToken, async (req, res) => {
    const customerId = req.params.id;
    try {
        const customer = await Customer.findOne({ id: customerId });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        customer.status = 0;
        await customer.save();
        res.json({ message: 'Customer deleted successfully' });
    } catch (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({ message: 'Failed to delete customer' });
    }
});


module.exports = router