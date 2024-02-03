const { JWTSECRET } = require('../config');
const jwt = require('jsonwebtoken');
const isLoggedInMiddileware = (req, res, next) => {
    const token = req.headers.token;
    try {
        const verify = jwt.verify(token, JWTSECRET);
        // if verified pass on to next
        if (verify) {
            req.userId = verify.userId;
            req.username = verify.username;
        }
        next();
    }
    catch (err) {
        console.log(err.message);
        return res.status(403).json({ message: "User nor logged in" });
    }
}

const isOwnerMiddileware = (req, res, next) => {
    try {
        const userId = req.userId;
        const username = req.username;
        // check if user with jwt and is same as that of author of posts
        const inputUser = req.user.username;
        if (inputUser != username) return res.status(403).json({ message: "Permission Denied" });
        else next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Inputs" });
    }
}
module.exports = { isLoggedInMiddileware, isOwnerMiddileware };