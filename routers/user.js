const express = require('express')
const { userRegister, userlogin } = require('../controllers/User')
const router = express.Router()


router.post('/register',userRegister)
router.post('/login', userlogin)


module.exports = router