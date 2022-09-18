const User = require('../models/useres')
const bcrypt = require("bcryptjs/dist/bcrypt")
const { userRegisterValidator, loginValidator } = require('../utilities/validators')


const userRegister = async (req, res) => {
    try {
        const validationResult = userRegisterValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json({ validationResult })
            return
        }
        const { firstName, lastName, phone, email,adress, password } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Account already exist" })
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newRegister = new User({
            firstName,
            lastName,
            adress,
            phone,
            email,
            password: hashedPassword
        })
        await newRegister.save()
        res.status(201).json({ message: "Account created successfully", })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const userlogin = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json({ validationResult })
            return
        }
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({
                error: 'Wrong email and/or password'
                
            });
            return;
        }
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
            res.status(401).json({
                error: 'Wrong email and/or password'
            });
            return;
        }
        user.password = undefined;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: `Welcome`,
            user,
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports ={
    userRegister,
    userlogin
}