const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: [3, "Length should be greater than 3"],
        maxLength: [30, "Length should be less than 30"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password should be greater than 6 Characters"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    otpDate: {
        type: Date
    },
    confirmOTP: {
        type: String
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetToken: String,
    resetDate: Date
},{
    timestamps: true,
    versionKey: false
})

const User = mongoose.model("User", userSchema)
module.exports = User