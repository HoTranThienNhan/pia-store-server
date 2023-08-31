const User = require('../models/UserModel')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser

        try {
            // Check if user existed by email
            const checkExistedUser = await User.findOne({
                email: email
            })
            if (checkExistedUser != null) {
                resolve({
                    status: 'OK',
                    message: 'Email already exists'
                })
            }
            // create new user
            const createdUser = await User.create({
                name,
                email,
                password,
                confirmPassword,
                phone
            }) 
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { createUser }