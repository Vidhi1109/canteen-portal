var express = require("express");
var router = express.Router();
var validator = require("email-validator");
var passwordValidator = require('password-validator');
var pass_schema = new passwordValidator();
pass_schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits

// Load User model
const User = require("../models/Users");
const Buyer = require("../models/Buyers");
const Vendor = require("../models/Vendors");
const Orders = require("../models/Orders");
const Fooditem = require("../models/Fooditems");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Fooditem.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/buyer", (req, res) => {

            const newBuyer = new Buyer({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                age: req.body.age,
                batch: req.body.batch,
                password: req.body.password
            });
            newBuyer.save()
                .then(newBuyer => {
                    res.status(200).json(newBuyer);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
});
router.post("/vendor", (req, res) => {


    const newVendor = new Vendor({
        name: req.body.name,
        shop: req.body.shop,
        email: req.body.email,
        contact: req.body.contact,
        opening: req.body.opening,
        closing: req.body.closing,
        password: req.body.password
    });
    newVendor.save()
    .then(vendor => {
        res.status(200).json(vendor);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});
// POST request 
// Login
router.post("/login", (req, res) => {
    Buyer.findOne({ email  : req.body.email , password : req.body.password }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "Hola" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/wallet", (req, res) => {
    Buyer.findOne({ email  : req.body.email }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "Hola" });
        }
        else {
            user.$set({wallet: req.body.wallet});
            user.save();
            return res.status(200).json(user);
        }
    });
});
router.post("/profile", (req, res) => {
    Buyer.findOne({ email  : req.body.email }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "Hola" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});

router.post("/profile2", (req, res) => {
    Vendor.findOne({ email  : req.body.email }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "Hola" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/login2", (req, res) => {
    Vendor.findOne({ email  : req.body.email , password : req.body.password }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "Hola" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/order", (req, res) => {
    const newOrder = new Orders({
        vendor: req.body.vendor,
        food: req.body.food,
        buyer: req.body.buyer,
        quantity: req.body.quantity,
        status: req.body.status,
        cost: req.body.cost,
        rating: req.body.rating,
        addon1: req.body.addon1,
        addon2: req.body.addon2,
        addon3: req.body.addon3,
        addon4: req.body.addon4,
        addon1price: req.body.addon1price,
        addon2price: req.body.addon2price,
        addon3price: req.body.addon3price,
        addon4price: req.body.addon4price,
    });
    newOrder.save()
        .then(newOrder => {
            res.status(200).json(newOrder);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/getorder", (req, res) => {

    Orders.find({ buyer: req.body.buyer }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "No orders" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/getorderbyvendor", (req, res) => {

    Orders.find({ vendor: req.body.vendor }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "No orders" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/editorderbyvendor", (req, res) => {

    Orders.findOne({ vendor: req.body.vendor , time: req.body.time }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "No orders" });
        }
        else {
            console.log(user);
            user.$set({status: req.body.status});
            user.save();
            return res.status(200).json(user);
        }
    });
});
router.post("/addfood", (req, res) => {

    const newFooditem = new Fooditem({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        rating: req.body.rating,
        addon1: req.body.addon1,
        addon1price: req.body.addon1price,
        addon2: req.body.addon2,
        addon2price: req.body.addon2price,
        addon3: req.body.addon3,
        addon3price: req.body.addon3price,
        addon4: req.body.addon4,
        addon4price: req.body.addon4price,
        tags1: req.body.tags1,
        tags2: req.body.tags2,
        tags3 : req.body.tags3,
        tags4 : req.body.tags4,
        vendor: req.body.vendor,
        canteen: req.body.canteen
    });
    newFooditem.save()
        .then(newFooditem => {
            res.status(200).json(newFooditem);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/getfood", (req, res) => {

    Fooditem.find({ name: req.body.name }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "No orders" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/getfoodbyvendor", (req, res) => {
    Fooditem.find({ vendor: req.body.vendor }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "No orders" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/deletefood", (req, res) => {
    Fooditem.deleteOne({ vendor: req.body.vendor , name: req.body.name }).then(user => {
        // Check if user email exists
        if (!user) 
        {
            return res.status(400).json({ message: "No orders" });
        }
        else {
            return res.status(200).json(user);
        }
    });
});
router.post("/changefood", (req, res) => {
    Fooditem.findOne({  vendor : req.body.vendor , name : req.body.name }).then(user => {
        if (!user) 
        {
            return res.status(400).json({ message: "Hola" });
        }
        else {
            user.$set({addon1: req.body.addon1});
            user.$set({addon2: req.body.addon2});
            user.$set({addon3: req.body.addon3});
            user.$set({addon4: req.body.addon4});
            user.$set({addon1price: req.body.addon1price});
            user.$set({addon2price: req.body.addon2price});
            user.$set({addon3price: req.body.addon3price});
            user.$set({addon4price: req.body.addon4price});
            user.$set({tags1: req.body.tags1});
            user.$set({tags2: req.body.tags2});
            user.$set({tags3: req.body.tags3});
            user.$set({tags4: req.body.tags4});
            user.$set({vendor: req.body.vendor});
            user.$set({canteen: req.body.canteen});
            user.save();
            return res.status(200).json(user);
        }
    });
});
module.exports = router;

