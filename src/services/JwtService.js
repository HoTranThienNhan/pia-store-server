const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign(
        { payload },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1h' }
    )
    return accessToken
}

const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign(
        { payload },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' }
    )
    return refreshToken
}

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'Authentication failed'
                    });
                }

                const { payload } = user;
                const accessToken = await generalAccessToken({
                    id: payload.id,
                    isAdmin: payload.isAdmin
                });

                resolve({
                    status: 'OK',
                    message: 'REFRESH TOKEN SUCCESS',
                    accessToken
                })
            });
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { generalAccessToken, generalRefreshToken, refreshTokenJwtService }