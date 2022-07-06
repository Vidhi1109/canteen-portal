const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Fooditem_Schema = new Schema({

	name: {
		type: String,
		required: true
	},
    price: {
        type: Number
    },
    type: {
        type: String,
        default: "",
        enum: ['Veg' , 'Non-Veg']
    },
    rating:{
        type: Number
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
    tags1:{
        type: String,
        default: ""
    },
    tags2:{
        type: String,
        default: ""
    },
    tags3:{
        type: String,
        default: ""
    },
    tags4:{
        type: String,
        default: ""
    },
    vendor:{
        type: String
    },
    canteen:{
        type: String
    }
});

module.exports = Fooditems = mongoose.model("Food_items", Fooditem_Schema);
