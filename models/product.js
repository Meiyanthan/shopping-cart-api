const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:'Please enter your name'},
    price: {type: Number, required:'Please enter Price',},
    productDesc: {type: String, required:'Please enter product desc'},
    productSeller:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String
    }
});

module.exports = mongoose.model("Product", productSchema);