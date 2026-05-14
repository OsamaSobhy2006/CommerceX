const yup = require('yup');

exports.createProductSchema = yup.object({
    name: yup.string().required('Name is required').min(3),
    description: yup.string().optional(),
    price: yup.number().typeError('Price must be number').required().positive(),
    category: yup.string().required('Category is required'),
    inStock: yup.boolean().optional(),
    isDeleted: yup.boolean().optional()
});

exports.updateProductSchema = yup.object({
    name: yup.string().min(3),
    description: yup.string(),
    price: yup.number().typeError('Price must be number').positive(),
    category: yup.string(),
    inStock: yup.boolean(),
    isDeleted: yup.boolean()
});