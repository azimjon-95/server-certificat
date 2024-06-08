const express = require('express')
// const requireAuth = require('../middleware/requireAuth')

// controller functions
const { signupUser, getUsers, updateUser, deleteUser, getSingleUser } = require('../controllers/userController')

const router = express.Router()
// router.use(requireAuth)
router.get('/getusers', getUsers)

router.get('/getsingle/:id', getSingleUser)
router.post('/register', signupUser)
// update user
router.put('/updateuser/:id', updateUser)
router.delete('/delete/:id', deleteUser)


module.exports = router