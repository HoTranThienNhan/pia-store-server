const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { fullname, email, password, phone, avatar, address, active, isAdmin } = newUser;

        try {
            // Check if user exists by email
            const checkExistedUser = await User.findOne({
                email: email
            });

            if (checkExistedUser != null) {
                resolve({
                    status: 'ERR',
                    message: 'Email already exists'
                });
            }

            // hash password with salt (cost = 10)
            const costHash = 10;
            const hash = bcrypt.hashSync(password, costHash);

            // create new user
            const createdUser = await User.create({
                fullname,
                email,
                password: hash,
                phone, 
                avatar, 
                address,
                active,
                isAdmin
            });
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW USER SUCCESS',
                    data: createdUser
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

const signinUser = (userSignin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userSignin;

        try {
            // Check if user existed by email
            const checkExistedUser = await User.findOne({
                email: email
            });

            if (checkExistedUser == null) {
                resolve({
                    status: 'ERR',
                    message: 'User does not exist'
                });
            }

            // compare password and password in database
            const comparePassword = bcrypt.compareSync(password, checkExistedUser.password);

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Username or password is incorrect'
                });
            }
            
            // check if account is active
            if (checkExistedUser.active === false) {
                resolve({
                    status: 'ERR',
                    message: 'User is inactive'
                });
            }

            // access and refresh token contains id and isAdmin fields
            const accessToken = await generalAccessToken({
                id: checkExistedUser.id,
                isAdmin: checkExistedUser.isAdmin
            });

            const refreshToken = await generalRefreshToken({
                id: checkExistedUser.id,
                isAdmin: checkExistedUser.isAdmin
            });

            resolve({
                status: 'OK',
                message: 'SIGN IN SUCCESS',
                accessToken,
                refreshToken
            });

        } catch (e) {
            reject(e);
        }
    });
}

const updateUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if user exists by email
            const checkExistedUser = await User.findOne({
                _id: userId
            });
            
            if (checkExistedUser == null) {
                resolve({
                    status: 'OK',
                    message: 'User does not exist'
                });
            }

            // if update password, hash password with salt (cost = 10)
            if (data.password != null) {
                const pwd = data.password;
                const costHash = 10;
                data.password = bcrypt.hashSync(pwd, costHash);
            }

            // if user exists, update new data for user by id
            const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

            resolve({
                status: 'OK',
                message: 'UPDATE USER SUCCESS',
                data: updatedUser
            });

        } catch (e) {
            reject(e);
        }
    });
}

const updateActiveMultipleUsers = (userEmails, isActive) => {
    return new Promise(async (resolve, reject) => {
        try {
            // if user exists, update new data for user by email
            const updatedMultipleUsers = await User.updateMany(
                { email: userEmails },
                { $set: { active: isActive } }
            );

            resolve({
                status: 'OK',
                message: 'UPDATE ACTIVE FOR MULTIPLE USERS SUCCESS',
                data: updatedMultipleUsers
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if user exists by email
            const checkExistedUser = await User.findOne({
                _id: userId
            });
            
            if (checkExistedUser == null) {
                resolve({
                    status: 'OK',
                    message: 'User does not exist'
                });
            }

            // if user exists then delete user by id
            await User.findByIdAndDelete(userId);

            resolve({
                status: 'OK',
                message: 'DELETE USER SUCCESS'
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {

            // get all users
            const allUsers = await User.find();

            resolve({
                status: 'OK',
                message: 'GET ALL USERS SUCCESS',
                data: allUsers
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getUserDetails = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            // check if user exists
            const checkExistedUser = await User.findOne({
                _id: userId
            });
            
            if (checkExistedUser == null) {
                resolve({
                    status: 'OK',
                    message: 'User does not exist'
                });
            }

            resolve({
                status: 'OK',
                message: 'GET USER SUCCESS',
                data: checkExistedUser
            });

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = { 
    createUser, 
    signinUser, 
    updateUser, 
    updateActiveMultipleUsers,
    deleteUser, 
    getAllUsers, 
    getUserDetails
}