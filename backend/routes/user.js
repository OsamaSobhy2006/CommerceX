const express = require('express')
const { getAllUsers, getUsersById, addUser, updateUser, deleteUser } = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')
const restrictTo = require('../middlewares/restrictTo')



const router = express.Router()

router.route('/')
.get(getAllUsers)
.post(addUser)


router.route('/:id')
.get(getUsersById)
.patch(updateUser)
.delete(deleteUser)


module.exports = router