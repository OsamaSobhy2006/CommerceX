const User = require('../models/user')
const crypto = require('crypto')
const {customAlphabet} = require('nanoid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const sendEmail = require('../utils/sendEmail')


const jwtSign = promisify(jwt.sign)

exports.signUp = catchAsync(async (req, res, next) => {
    const {email, password} = req.body

    const findUser = await User.findOne({email})
    
    if(findUser) return next(new AppError("Email Already Exists", 400))
      

    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS)

    const OTP = customAlphabet("0123456789", 6)()

    const confirmOTP = await bcrypt.hash(OTP, +process.env.SALT_ROUNDS)

    const otpDate = Date.now() + 10 * 60 * 1000

    const user = await User.create({...req.body, password:hashPassword, confirmOTP, otpDate })

  await sendEmail(
  email,
  "Confirm Your Email",
  "",
  `
  <div style="
    max-width:600px;
    margin:auto;
    padding:40px;
    font-family:Arial,sans-serif;
    background:#f8f9fa;
    border-radius:20px;
    text-align:center;
  ">

    <h1 style="
      color:#111827;
      margin-bottom:20px;
    ">
      Welcome To CommerceX 🛍️
    </h1>

    <p style="
      font-size:18px;
      color:#6b7280;
      margin-bottom:30px;
    ">
      Use the OTP below to confirm your email address.
    </p>

    <div style="
      background:linear-gradient(to right,#7b2ff7,#f107a3);
      color:white;
      font-size:40px;
      font-weight:bold;
      padding:20px;
      border-radius:16px;
      letter-spacing:8px;
      margin-bottom:30px;
    ">
      ${OTP}
    </div>

    <p style="
      color:#9ca3af;
      font-size:14px;
    ">
      This OTP will expire in 10 minutes.
    </p>

  </div>
  `
)

  return res.status(200).json({
        success: true,
        message: "OTP sent successfully"
    })


    
})

exports.confirmEmail = catchAsync(async (req, res, next) => {
    const {email, confirmOTP} = req.body
    const findUser = await User.findOne({email})

    if(!findUser) return next(new AppError("Email not found", 404))

    if(findUser.isConfirmed) return next(new AppError("this email is already active", 400))

    const check = await bcrypt.compare(confirmOTP, findUser.confirmOTP)
    if(!confirmOTP || !check || findUser.otpDate < Date.now()) return next(new AppError("Invalid OTP or expired"), 400)


    findUser.isConfirmed = true;
    findUser.confirmOTP = null
    findUser.otpDate = null
    await findUser.save()

    res.status(200).json({
        success: true,
        message: "Email is confirmed"
    })
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body
    const findUser = await User.findOne({email})
    if(!findUser) return next(new AppError("invalid credentianl", 400))
    if(!findUser.isConfirmed) return next(new AppError("Your account is not confirmed please confirm first", 400))
    
    const check = await bcrypt.compare(password, findUser.password)

    if(!check) return next(new AppError("invalid credentianl", 400))
    
    const token = await jwtSign(
    {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role
    },
    process.env.SECRET_KEY,
    {
        expiresIn: "7d"
    }
)
    
    res.status(200).json({token})
})

exports.forgetPassword = catchAsync(async(req, res, next) => {
    const {email} = req.body
    const findUser = await User.findOne({email})
    if(!findUser) return next(new AppError("Email not found", 404))

    const resetToken = crypto.randomBytes(32).toString("hex")
    findUser.resetToken = resetToken
    findUser.resetDate = Date.now() + 10 * 60 * 1000
    await findUser.save()

    const link = `https://commerce-x-seven.vercel.app/reset-password/${resetToken}`

    res.status(200).json({
        success: true,
        message: "Reset Password Link is sent to your email"
    })

sendEmail(
  email,
  "Reset Your Password",
  "",
  `
  <div style="
    max-width:600px;
    margin:auto;
    padding:40px;
    background:#f8f9fa;
    border-radius:20px;
    font-family:Arial,sans-serif;
    text-align:center;
  ">

    <h1 style="
      color:#111827;
      margin-bottom:20px;
    ">
      Reset Your Password 🔐
    </h1>

    <p style="
      color:#6b7280;
      font-size:18px;
      margin-bottom:30px;
      line-height:1.6;
    ">
      We received a request to reset your password.
      Click the button below to continue.
    </p>

    <a
      href="${link}"
      style="
        display:inline-block;
        padding:16px 32px;
        background:linear-gradient(to right,#7b2ff7,#f107a3);
        color:white;
        text-decoration:none;
        border-radius:14px;
        font-size:18px;
        font-weight:bold;
      "
    >

      Reset Password

    </a>

    <p style="
      margin-top:30px;
      color:#9ca3af;
      font-size:14px;
      line-height:1.6;
    ">

      If you didn’t request a password reset,
      you can safely ignore this email.

    </p>

  </div>
  `
)

    
})

exports.resetPassword = catchAsync(async(req, res, next) => {
    const {token} = req.params
    const findUser = await User.findOne({resetToken: token, resetDate: {$gt: Date.now()}})
    if(!findUser) return next(new AppError("Invalid or expired token", 400))

    const {password} = req.body
    if(password.length < 6) return next(new AppError("Password should be greater than 6 characters", 400))

    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS)
    findUser.password = hashPassword
    findUser.resetToken = null
    findUser.resetDate = null
    await findUser.save()

    res.status(200).json({
        success: true,
        message: "Password is reset successfully"
    })
})