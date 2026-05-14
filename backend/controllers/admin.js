const order = require("../models/order")
const product = require("../models/products")
const User = require("../models/user")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")

exports.getDashboardStats = catchAsync(async(req, res, next) => {
    const totalProducts = await product.countDocuments()
    const totalOrders = await order.countDocuments()
    const totalUsers = await User.countDocuments()
    const paidOrder = await order.find({isPaid: true})
    const totalRevenue = paidOrder.reduce((total, order) => total + order.totalPrice, 0)

    if(!paidOrder) return next(new AppError("Failed to get paid orders", 400))

    res.status(200).json({
        status: "success",
        data: {
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue
        }
    })
})