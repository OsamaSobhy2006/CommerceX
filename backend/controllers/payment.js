const catchAsync = require("../utils/catchAsync");
const stripe = require('../config/stripe')
const Order = require('../models/order');
const AppError = require("../utils/AppError");


exports.checkOut = catchAsync(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("items.product", "name price description image")
    if(!order) return next(new AppError("Order not found", 404))

    if(order.isPaid) return next(new AppError("Order already paid", 400))

    const line_items = order.items.map(item => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.product.name,
                description: item.product.description || "No Description",
                images: [item.product.image],
            },
        unit_amount: item.product.price * 100
        },
            quantity: item.quantity || 1
        }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: "https://commerce-x-seven.vercel.app/success",
        cancel_url: "https://commerce-x-seven.vercel.app/cancel",
        metadata: {
            orderId: order._id.toString()
        },
    })

    res.status(200).json({
        success: "true",
        url: session.url
    })
})

exports.webhook = async (req, res, next) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
}


    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        if (!orderId) return next(new AppError("Order ID missing", 400));

        const order = await Order.findById(orderId);
        if (!order) return next(new AppError("Order not found", 404));

        order.isPaid = true;
        order.paidAt = Date.now();
        order.status = "confirmed"

        await order.save();
    }

    res.status(200).json({ received: true });
};