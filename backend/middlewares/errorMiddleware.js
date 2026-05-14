const AppError = require('../utils/AppError');

const globalErrorMiddleware = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(err.name === 'TokenExpiredError') err = new AppError("Token Expired Please login", 401);
    if(err.name === 'JsonWebTokenError') err = new AppError("Invalid Token", 401);
    if(err.name === 'CastError') {
        err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    if(err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        err = new AppError(`${field} already exists`, 400);
    }

    if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(el => el.message).join(', ').replaceAll("Path", "");
        err = new AppError(messages, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message || "internal server error"
    });
};

module.exports = globalErrorMiddleware;