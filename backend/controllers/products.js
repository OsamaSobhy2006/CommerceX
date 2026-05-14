const Products = require('../models/products.js')
const AppError = require('../utils/AppError.js')
const catchAsync = require('../utils/catchAsync.js')
const ApiFeatures = require('../utils/ApiFeatures.js')

exports.getAllProducts = catchAsync(async (req, res, next) => {

    const features = new ApiFeatures(Products.find(), req.query).filter().search().sort().fields().pagination()
    const totalProducts = await Products.countDocuments();


    const products = await features.query
    res.status(200).json({
        success: true,
        totalProducts,
        productCount: products.length,
        data: products
    });
}) 

exports.getProductById = catchAsync(async (req, res, next) => {
        const {id} = req.params
        const products = await Products.findById(id)

        if(!products) 
            return next(new AppError("Product now found", 404))


        res.status(200).json(products)
})

exports.addProduct = catchAsync( async (req, res, next) => {
        const {name, description, price, category, inStock, isDeleted, image} = req.body
        const newProduct = await Products.create({
            name, 
            description,
            price,
            category,
            inStock,
            isDeleted,
            image
        })

        res.status(201).json({status: "success", Products: newProduct})
})


exports.updateProduct = catchAsync( async (req, res, next) => {
        const {id} = req.params

        const updateProduct = await Products.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!updateProduct)
            return next (new AppError("Product not found", 404))


        res.status(200).json({status: "success", data: updateProduct})
})

exports.deleteProduct = catchAsync( async (req, res, next) => {
        const {id} = req.params
        const deleteProduct = await Products.findByIdAndDelete(id)

        if(!deleteProduct)
            return next(new AppError("Product not found", 404))


        res.status(200).json({
            status: "success",
            message: "product deleted successfully",
            product:deleteProduct
        })

    })


exports.getStats = catchAsync(async (req, res, next) => {

    const stats = await Products.aggregate([
        {
            $facet: {

                total: [
                    { $count: "count" }
                ],

                inStock: [
                    {
                        $match: {
                            $or: [
                                { inStock: true },
                                { inStock: { $exists: false } }
                            ]
                        }
                    },
                    { $count: "count" }
                ],

                deleted: [
                    { $match: { isDeleted: true } },
                    { $count: "count" }
                ],

                priceStats: [
                    {
                        $group: {
                            _id: null,
                            avgPrice: { $avg: "$price" },
                            maxPrice: { $max: "$price" },
                            minPrice: { $min: "$price" }
                        }
                    }
                ],

                categoryStats: [
                    {
                        $match: {
                            $or: [
                                { isDeleted: false },
                                { isDeleted: { $exists: false } }
                            ]
                        }
                    },
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 },
                            avgPrice: { $avg: "$price" }
                        }
                    }
                ]
            }
        }
    ]);

    res.status(200).json(stats[0]);
});

exports.getDeletedProducts = catchAsync( async (req, res, next) => {
        const deletedProducts = await Products.find({isDeleted: true})
        
        if(!deletedProducts)
            return next(new AppError("Product not found", 404))

        res.status(200).json(deletedProducts)
})

exports.softDeleteProducts = catchAsync( async (req, res, next) => {
        const {id} = req.params
        const product = await Products.findByIdAndUpdate(id, {isDeleted: true}, {new: true})

        if(!product)
            return next(new AppError("Product not found", 404))

        res.status(200).json({
            status: "success",
            message: "product deleted successfully",
            product
        })
})