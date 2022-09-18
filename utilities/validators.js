const Joi = require('joi');
const checknumber = Joi.extend(require('joi-phone-number'))

const userRegisterValidator = Joi.object({
    firstName : Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    phone: checknumber.string().phoneNumber({defaultCountry : 'TN', format: 'rfc3966'}).required(),
    email: Joi.string().email().required(),
    adress: Joi.string().min(3).required(),
    password: Joi.string().required()
})



module.exports ={
    userRegisterValidator
}