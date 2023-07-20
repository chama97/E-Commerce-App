const router = require("express").Router();
const  Item  = require("../model/item.model");
const authentication = require('../middleware/authFilter');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/GDSE_57/CourseWork/E-Commerce-App/api/uploads');
    },
    filename: (req, file, cb) => {
        cb(file.originalname);
    },
});
const upload = multer({ storage });


// Create New Item
router.post('/save', authentication, upload.single('photo'), async (req, res) => {
    try {
        const formData = JSON.parse(req.body.data);
        const { name, description, qty, price } = formData;

        let photo = '';
        if (req.file) {
            photo = req.file.filename;
        } else {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const item = new Item({
            name,
            description,
            photo,
            qty,
            price,
            status:1
        });
        await item.save();
        res.status(201).json({ message: 'Item created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


// Update Item By ID 
router.put('/update/:id', authentication, upload.single('photo'), async (req, res) => {
    const itemId = req.params.id;
    const { name, description, qty, price } = req.body;
    try {
        const item = await Item.findOne({ id: itemId });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        item.name = name;
        item.description = description;
        item.photo = req.file ? req.file.path : '';
        item.qty = qty;
        item.status = 1;
        item.price = price;
        await item.save();
        res.json({ message: 'Item updated successfully' });
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ message: 'Failed to update item' });
    }
});


// Get All Items by status Using Pagination
router.get('/all', authentication, async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        
        if (isNaN(offset) || isNaN(limit)) {
            return res.status(400).json({ message: 'Invalid offset or limit values' });
        }
        const items = await Item.find({ status: 1 })
            .skip(offset)
            .limit(limit);

        res.status(200).json({ message: 'Success', data: items });
    } catch (err) {
        console.error('Error retrieving items:', err);
        res.status(500).json({ message: 'Failed to retrieve items' });
    }
});


// Get item by ID
router.get('/:id', authentication, async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findOne({ id: itemId });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Success', data: item });
    } catch (err) {
        console.error('Error retrieving item:', err);
        res.status(500).json({ message: 'Failed to retrieve item' });
    }
});


// Delete Item By ID 
router.put('/remove/:id', authentication, async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findOne({ id: itemId });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        item.status = 0;
        await item.save();
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error('Error delete item:', err);
        res.status(500).json({ message: 'Failed to delete item' });
    }
});


module.exports = router