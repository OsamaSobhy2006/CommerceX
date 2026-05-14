const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

const restrictTo = (roles) => catchAsync(async(req, res, next) => {
    const {role} = req.user

    if(role == roles) next()
    else next(new AppError("this route is protected", 403))
})

module.exports = restrictTo