const { addToCart, getCart, removeItem, updateQuantity, clearCart } = require('../controllers/cart')
const authMiddleware = require('../middlewares/auth')

const router = require('express').Router()

router.route('/')
.post(authMiddleware ,addToCart)
.get(authMiddleware, getCart)
.patch(authMiddleware, updateQuantity)
.delete(authMiddleware, clearCart)

router.route('/:productId')
.delete(authMiddleware, removeItem)


module.exports = router