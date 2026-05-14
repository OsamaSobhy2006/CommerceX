const catchAsync = require("../utils/catchAsync");
const Product = require("../models/products");
const AppError = require('../utils/AppError');
let Cart = require('../models/cart')


exports.addToCart = catchAsync(async (req, res, next) => {
    const {productId, quantity} = req.body

    if(!productId || !quantity) return next(new AppError("Product ID and quantity are required", 400))

    const product = await Product.findById(productId)
    if(!product) return next(new AppError("Product not found", 404))

    if(!product.inStock) return next(new AppError("Product is out of Stock", 400))

    let cart = await Cart.findOne({user: req.user._id})
    if(!cart){
        cart = new Cart({
            user: req.user._id,
            items: [],
            totalPrice: 0
        })
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)

    if(itemIndex > -1) cart.items[itemIndex].quantity += quantity
    else {
        cart.items.push({
            product: productId,
            quantity,
            price: product.price
        })
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    await cart.save()
    await cart.populate("items.product", "name image") 

    res.status(200).json(cart)
    
})

exports.getCart = catchAsync(async(req, res, next) => {
    const cart = await Cart.findOne({user: req.user._id}).populate("items.product", "name image")

    if(!cart) return res.status(200).json({data: {
        cart: {
            items: [],
            totalPrice: 0
        }
    }})

    return res.status(200).json({data: cart})
})

exports.removeItem = catchAsync(async(req, res, next) => {
    const {productId} = req.params
    const cart = await Cart.findOne({user: req.user._id})

    if(!cart) return next(new AppError("Cart not found", 404))

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)

    if(itemIndex === -1) return next(new AppError("Item not found in cart", 404))
        
    cart.items.splice(itemIndex, 1)

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

    await cart.save()

    res.status(200).json({
        message: "Product deleted seccessfully",
        data: {cart}
    })
})

exports.updateQuantity = catchAsync(async (req, res, next) => {
    const {productId, quantity} = req.body
    if(!productId || quantity < 0) return next(new AppError("Product ID and valid quantity are required", 400))

    const cart = await Cart.findOne({user: req.user._id})
    if(!cart) return next(new AppError("Cart not found", 404))

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
    if(itemIndex === -1) return next(new AppError("Item not found in cart", 404))

    if(quantity === 0) cart.items.splice(itemIndex, 1)
    else cart.items[itemIndex].quantity = quantity

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
    await cart.save()

    res.status(200).json({data: cart})
})

exports.clearCart = catchAsync(async (req, res, next) => {
    const cart = await Cart.findOne({user: req.user._id})
    if(!cart) return next(new AppError("Cart not found", 404))

    cart.items = []
    cart.totalPrice = 0
    await cart.save()

    res.status(200).json({data: cart})
})