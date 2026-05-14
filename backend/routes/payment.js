const express = require('express')
const router = express.Router()
const { checkOut, webhook } = require('../controllers/payment')
const authMiddleWare = require('../middlewares/auth')

router.post('/checkout/:id', authMiddleWare, checkOut)

router.post('/webhook', webhook)



module.exports = router