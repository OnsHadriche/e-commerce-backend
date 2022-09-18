const express = require('express')
const { userRegister } = require('../controllers/User')
const router = express.Router()


router.post('/register',userRegister)


module.exports = router