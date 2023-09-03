const jwt = require('jsonwebtoken')

const generalAccessToken = async (payload) => {

    console.log("payload", payload)

    const accessToken = jwt.sign(
        { payload },
        'accessToken',
        { expiresIn: '1h' }
    )
    return accessToken
}

const generalRefreshToken = async (payload) => {

    console.log("payload", payload)

    const accessToken = jwt.sign(
        { payload },
        'refreshToken',
        { expiresIn: '365d' }
    )
    return accessToken
}

module.exports = { generalAccessToken, generalRefreshToken }