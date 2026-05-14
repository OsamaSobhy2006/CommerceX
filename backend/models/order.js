const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
                quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"]
            },
                price: {
                type: Number,
                required: true 
            }
        }
    ],
    totalPrice:{
        type: Number,
        required: true
    },
    shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String
},
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    isPaid: {
        type: Boolean, 
        default: false
    },
    paidAt: Date,
    deliveredAt: Date,
    cancelledAt: Date

}, {
    timestamps: true,
    versionKey: false
}
)

const order = mongoose.model("order", orderSchema)
module.exports = order