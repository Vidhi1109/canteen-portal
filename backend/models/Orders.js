const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Schema_Order = new Schema({
	time: {
		type: Date,
        default: Date.now()
	},
    buyer:
    {
        type: String
    },
    food:
    {
        type: String
    },
	vendor: 
    {
		type: String,
	},
    rating:
    {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number
    },
    status: {
        type: String,
        default: 'PLACED',
        enum: ['PLACED' , 'ACCEPTED' , 'COOKING' , 'READY FOR PICKUP' , 'COMPLETED' , 'REJECTED']
    },
    Quantity: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
    },
    addon1:{
        type: String,
        default: ""
    },
    addon1price:{
        type: Number,
        default: 0
    },
    addon2:{
        type: String,
        default: ""
    },
    addon2price:{
        type: Number,
        default: 0
    },
    addon3:{
        type: String,
        default: ""
    },
    addon3price:{
        type: Number,
        default: 0
    },
    addon4:{
        type: String,
        default: ""
    },
    addon4price:{
        type: Number,
        default: 0
    },
});

module.exports = Orders = mongoose.model("Order_schema", Schema_Order);
