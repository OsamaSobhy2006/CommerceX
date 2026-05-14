const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')

const authMiddleware = catchAsync(async (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const {id} = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(id)
        req.user = user
        next()
    }
    else
        return next(new AppError("Please login first", 400))
})

module.exports = authMiddleware