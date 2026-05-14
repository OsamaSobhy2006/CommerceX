const router = require('express').Router()
const {signUp, confirmEmail, login, forgetPassword, resetPassword} = require('../controllers/auth')

router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/confirm-email').post(confirmEmail)
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:token').post(resetPassword)



module.exports = router