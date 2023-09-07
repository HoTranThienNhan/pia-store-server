const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {

    if (req.headers.token != null) {

        // token of user (admin)
        const token = req.headers.token.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                return res.status(404).json({
                    status: 'ERROR',
                    message: 'Authentication failed'
                })
            }

            const { payload } = user;

            // if user is not admin, notify error
            if (!payload.isAdmin) {
                return res.status(404).json({
                    status: 'ERROR',
                    message: 'Authentication failed'
                })
            }

            // if user is admin, forward to next middleware in router
            next();

        });

    } else {
        return res.status(404).json({
            status: 'ERROR',
            message: 'Authentication failed'
        })
    }
}

module.exports = { authMiddleware }