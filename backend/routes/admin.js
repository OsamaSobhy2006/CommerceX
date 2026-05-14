const { getDashboardStats } = require('../controllers/admin')
const authMiddleware = require('../middlewares/auth')
const restrictTo = require('../middlewares/restrictTo')

const router = require('express').Router()

router.get('/dashboard', authMiddleware, restrictTo('admin'), getDashboardStats)

module.exports = router