const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign(
        { ...payload }, // ...payload to expand all elements of payload, instead of being contained in payload
        process.env.ACCESS_TOKEN,
        { expiresIn: '365d' }
    )
    return accessToken
}

const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign(
        { ...payload }, // ...payload to expand all elements of payload, instead of being contained in payload
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
                        status: 'ERR',
                        message: 'Authentication failed'
                    });
                }

                const accessToken = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
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