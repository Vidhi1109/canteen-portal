const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
    contact: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    batch: {
        type: String,
        enum: ['UG1' , 'UG2' , 'UG3' , 'UG4' , 'UG5']
    },
    wallet: {
        type: Number,
        default : 0
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
