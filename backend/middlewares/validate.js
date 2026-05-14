const AppError = require("../utils/AppError");

const validate = (schema) => async (req, res, next) => {
    try {
        const checkSchema = await schema.validate(req.body, {abortEarly: false})
        if(checkSchema) next()
    } catch (err) {
        const error = err.errors.join(", ")
        next(new AppError(error, 400))
    }
};

module.exports = validate;