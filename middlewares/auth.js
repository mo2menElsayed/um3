const jwt = require('jsonwebtoken');

const isAuthorize = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decodedToken;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials or expired token!",
            error
        })
    }
}

module.exports = { isAuthorize }