const Order = require("../models/order");
const Cart = require("../models/cart")
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");


exports.createOrder = catchAsync(async (req, res, next) => {

    const { shippingAddress } = req.body;

    if(
        !shippingAddress ||
        !shippingAddress.address ||
        shippingAddress.address.trim() === ""
    ){
        return next(new AppError("Shipping Address is required", 400));
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if(!cart || cart.items.length === 0){
        return next(new AppError("Cart is empty", 400));
    }

    const orderData = {
        user: req.user._id,
        items: cart.items,
        totalPrice: cart.totalPrice,
        shippingAddress,
        status: "pending",
        isPaid: false
    };

    const order = await Order.create(orderData);

    await order.populate("items.product", "name");

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(201).json({
        status: "success",
        data: { order }
    });

});

exports.getMyOrders = catchAsync(async(req, res, next) => {
    const order = await Order.find({user: req.user._id})
    .populate("items.product", "name price").sort("-createdAt")

    if(!order) return next(new AppError("User has no orders", 400))

    res.status(200).json({
        status: "success",
        results: order.length,
        data: {order}
    })
})

exports.getOrderById = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const order = await Order.findById(id).populate("items.product", "name price").populate("user", "name email")

    if(!order) return next(new AppError("Order not found", 404))

    const isOwner = order.user._id.toString() === req.user._id.toString()
    const isAdmin = req.user.role === "admin"

    if(!isOwner && !isAdmin) return next(new AppError("you are not allowed to access this order", 403))

    res.status(200).json({
        status: "success",
        data: {order}
    })
})

exports.getAllOrders = catchAsync(async(req, res, next) => {
    const features = new ApiFeatures(Order.find(), req.query).pagination()

    const orders = await features.query.populate("user", "name email").populate("items.product", "name price")
    const total = await Order.countDocuments()

    res.status(200).json({
        status: "success",
        total,
        data: {orders}
    })
})

exports.updateStatus = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const {status} = req.body

    const validateStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    if(!validateStatuses.includes(status)) return next(new AppError("Invalid order status", 400))

    const order = await Order.findById(id)
    if(!order) return next(new AppError("Order not found", 404))

    const allowedTransitions = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["shipped", "cancelled"],
        shipped: ["delivered"],
        delivered: [],
        cancelled: []
    }

    const currentStatus = order.status
    if(!allowedTransitions[currentStatus].includes(status))
        return next(new AppError(`Cannot change status from ${currentStatus} to ${status}`))

    order.status = status
    if(status === "delivered")
        order.deliveredAt = Date.now()

    if(status === "cancelled")
        order.cancelledAt = Date.now()

    await order.save()

    res.status(200).json({
        status: "success",
        data: {order}
    })
    
})

exports.deleteOrder = catchAsync(async(req, res, next) => {

    const order = await Order.findById(req.params.id)

   if(!order){
   return res.status(200).json({
      status: "success",
      message: "Order already deleted"
   })
}

   if(order.isPaid)
      return next(new AppError("Cannot delete paid order", 400))

   await Order.findByIdAndDelete(req.params.id)

   res.status(200).json({
      status: "success",
      message: "Order deleted successfully"
   })

})