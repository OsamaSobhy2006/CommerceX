const { createOrder, getMyOrders, getOrderById, getAllOrders, updateStatus, deleteOrder } = require('../controllers/order')
const authMiddleware = require('../middlewares/auth')
const restrictTo = require('../middlewares/restrictTo')

const router = require('express').Router()

router.route('/')
.post(authMiddleware, createOrder)
.get(authMiddleware, restrictTo("admin"), getAllOrders)

router.route('/my')
.get(authMiddleware, getMyOrders)

router.route('/:id').get(authMiddleware, getOrderById).delete(authMiddleware, deleteOrder)
router.route('/:id/status').patch(authMiddleware, restrictTo("admin"), updateStatus)



module.exports = router