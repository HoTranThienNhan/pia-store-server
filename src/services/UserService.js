const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser

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

            // hash password with salt (cost = 10)
            const costHash = 10
            const hash = bcrypt.hashSync(password, costHash)

            // create new user
            const createdUser = await User.create({
                name,
                email,
                password: hash,
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

const signinUser = (userSignin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = userSignin

        try {
            // Check if user existed by email
            const checkExistedUser = await User.findOne({
                email: email
            })

            if (checkExistedUser == null) {
                resolve({
                    status: 'OK',
                    message: 'Email does not exist'
                })
            }

            // compare password and password in database
            const comparePassword = bcrypt.compareSync(password, checkExistedUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'Username or password is incorrect'
                })
            }

            const accessToken = await generalAccessToken({
                id: checkExistedUser.id,
                isAdmin: checkExistedUser.isAdmin
            })

            const refreshToken = await generalRefreshToken({
                id: checkExistedUser.id,
                isAdmin: checkExistedUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                accessToken,
                refreshToken
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { createUser, signinUser }