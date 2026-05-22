const express = require('express')
const app = express()
require('dotenv').config()
const expressLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const productRouters = require('./routes/products.js')
const userRouters = require('./routes/user.js')
const authRouters = require('./routes/auth.js')
const globalErrorMiddleware = require('./middlewares/errorMiddleware.js')
const authMiddleware = require('./middlewares/auth.js')
const restrictTo = require('./middlewares/restrictTo.js')
const cartRoutes = require('./routes/cart.js')
const orderRoutes = require('./routes/order.js')
const paymentRouter = require('./routes/payment.js')
const adminRouter = require('./routes/admin.js')


app.use('/uploads', express.static('uploads'))

app.set('query parser', 'extended');

app.use('/payment/webhook', express.raw({ type: 'application/json' }))

app.use(express.json())
app.use(helmet())
app.use(cors({
  origin: 'https://commerce-x-seven.vercel.app'
}))
const limiter = expressLimit.rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 1000
})
app.use(limiter)
app.use('/payment', paymentRouter)

app.use('/products', productRouters)
app.use('/users', userRouters)
app.use('/auth', authRouters)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/admin', adminRouter)


app.use(globalErrorMiddleware)
module.exports = app

