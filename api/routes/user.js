const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const authentication = require('../middleware/authFilter');

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, status } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({
            name,
            email,
            password: encryptedPassword,
            status,
        });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = user.generateAuthToken();
        return res.status(200).send({
            message: "User login successfully",
            data: token
        });      
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Login failed' });
    }
});


router.get('/all', authentication, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Success', data: users });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

module.exports = router