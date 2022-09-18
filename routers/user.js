const express = require('express')
const { userRegister } = require('../controllers/User')
const router = express.Router()


router.post('/user-account',userRegister)


module.exports = router