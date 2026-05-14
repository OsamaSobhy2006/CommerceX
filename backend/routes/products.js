const express = require('express')
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, getStats, getDeletedProducts, softDeleteProducts } = require('../controllers/products')
const validate = require('../middlewares/validate.js');
const {createProductSchema} = require('../validators/productValidators.js');


const router = express.Router()

router.route('/')
.get(getAllProducts)
.post(addProduct)
.post(validate(createProductSchema), addProduct)


router.route('/stats').get(getStats)
router.route('/deleted').get(getDeletedProducts)

router.route('/:id')
.get(getProductById)
.patch(updateProduct)
.delete(deleteProduct)
.delete(softDeleteProducts)


module.exports = router