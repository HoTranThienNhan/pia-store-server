const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authAdminMiddleware = (req, res, next) => {

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
            if (payload.isAdmin == false) {
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

const authUserMiddleware = (req, res, next) => {

    if (req.headers.token != null) {

        // token of user
        const token = req.headers.token.split(' ')[1];

        // id of user
        const userId = req.params.id;

        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                return res.status(404).json({
                    status: 'ERROR',
                    message: 'Authentication failed'
                })
            }

            const { payload } = user;

            // if user is not admin, notify error
            if (payload.isAdmin == false && payload.id != userId) {
                return res.status(404).json({
                    status: 'ERROR',
                    message: 'Authentication failed!'
                })
            }

            // if user is admin or user id in payload matches with user id, forward to next middleware in router
            next();

        });

    } else {
        return res.status(404).json({
            status: 'ERROR',
            message: 'Authentication failed'
        })
    }
}



module.exports = { authAdminMiddleware, authUserMiddleware }