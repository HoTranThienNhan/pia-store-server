const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body 
        const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isValidEmail = emailReg.test(email)

        // Check required fields
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        } 
        // Check valid email
        else if (!isValidEmail) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Incorrect email'
            })
        } 
        // Check if password matching confirm password
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Password and confirm password does not match'
            })
        };

        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = { createUser }