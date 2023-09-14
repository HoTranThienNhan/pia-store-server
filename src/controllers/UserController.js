const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

// check valid fields before create new user account
const createUser = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword, phone } = req.body;

        const fullnameReg = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
        const isValidFullname = fullnameReg.test(fullname);

        const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isValidEmail = emailReg.test(email);

        const phoneReg = /^(0)+([0-9]{9,10})$/;
        const isValidPhone = phoneReg.test(phone);

        // Check required fields
        if (!fullname || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } 
        // Check valid fullname
        else if (!isValidFullname) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Incorrect full name'
            });
        } 
        // Check valid email
        else if (!isValidEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Incorrect email'
            });
        } 
        // Check valid phone
        else if (!isValidPhone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Incorrect phone number'
            });
        } 
        // Check if password matching confirm password
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Password and confirm password does not match'
            });
        };

        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// check valid fields before sign in
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isValidEmail = emailReg.test(email);

        // Check required fields
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } 
        // Check valid email
        else if (!isValidEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Incorrect email'
            });
        } 

        const response = await UserService.signinUser(req.body);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// check id user exists in database before update
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'User ID is required'
            });
        }
        
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// check id user exists in database before delete
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'User ID is required'
            });
        }
        
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// get all users information
const getAllUsers = async (req, res) => {
    try {
        const response = await UserService.getAllUsers();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// get particular user information
const getUserDetails = async (req, res) => {
    try {

        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'User ID is required'
            });
        }

        const response = await UserService.getUserDetails(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

// create refresh token
const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1];

        if (!token) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Token is required'
            });
        }

        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}


module.exports = { 
    createUser, 
    signinUser, 
    updateUser, 
    deleteUser, 
    getAllUsers, 
    getUserDetails,
    refreshToken 
}