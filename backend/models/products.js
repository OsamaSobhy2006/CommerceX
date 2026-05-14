const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: [3, "Length should be greater than 3"],
            maxLength: [30, "Length should be less than 30"],
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, "The price shouldn't be negative"]
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["sports", "electronics", "clothes"]
        },
        image: {
            type: String,
        },
        inStock: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, {
        versionKey: false,
        timestamps: true
    }
)

const product = mongoose.model('Product', productSchema)
module.exports = product