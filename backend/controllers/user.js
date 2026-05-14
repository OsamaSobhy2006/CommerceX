const User = require('../models/user.js')
const AppError = require('../utils/AppError.js')
const catchAsync = require('../utils/catchAsync.js')
const ApiFeatures = require('../utils/ApiFeatures.js')

exports.getAllUsers = catchAsync(async (req, res, next) => {

    const features = new ApiFeatures(User.find(), req.query).filter().search().sort().fields().pagination()

    const users = await features.query
    res.status(200).json({
        success: true,
        UsersCount: users.length,
        data: users
    });
}) 

exports.getUsersById = catchAsync(async (req, res, next) => {
        const {id} = req.params
        const user = await User.findById(id)

        if(!user) 
            return next(new AppError("User now found", 404))


        res.status(200).json(user)
})

exports.addUser = catchAsync( async (req, res, next) => {
        const {name, email, password} = req.body
        const newUser = await User.create({
            name, 
            email,
            password
        })

        res.status(201).json({status: "success", User: newUser})
})


exports.updateUser = catchAsync( async (req, res, next) => {
        const {id} = req.params

        const updateUser = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!updateUser)
            return next (new AppError("Uesr not found", 404))


        res.status(200).json({status: "success", data: updateUser})
})

exports.deleteUser = catchAsync( async (req, res, next) => {
        const {id} = req.params
        const deleteUser = await User.findByIdAndDelete(id)

        if(!deleteUser)
            return next(new AppError("User not found", 404))


        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
            product:deleteUser
        })

    })

