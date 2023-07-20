const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const autoIncrement = require('mongoose-plugin-autoinc');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id,
        id: this.id,
     },process.env.SECRET_KEY , {
		expiresIn: "1d",
	});
	return token;
};

module.exports = mongoose.model('User', userSchema) 
