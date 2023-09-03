const UserService = require('../services/UserService')

// check valid fields before create new user account
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

// check valid fields before sign in
const signinUser = async (req, res) => {
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

        const response = await UserService.signinUser(req.body)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

// 
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body

        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'User ID is required'
            })
        }
        
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = { createUser, signinUser, updateUser }