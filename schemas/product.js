let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min : 0

    },
    quantity: {
        type: Number,
        default : 0,
        min: 0
    },
    imgURL : {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})
module.exports = mongoose.model('product', productSchema);