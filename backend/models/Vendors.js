const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		
	},
	shop: {
		type: String,
		
	},
    email: {
		type: String,
		
	},
    contact: {
        type: Number,
        
    },
    opening: 
    {
        type: String,
        
    },
    closing:
    {
        type: String,
        
    },
    password: {
        type: String,
        
    }
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
