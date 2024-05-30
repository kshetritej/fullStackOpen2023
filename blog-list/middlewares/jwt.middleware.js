const jwt = require("jsonwebtoken")
const User = require("../models/user")

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.replace('Bearer ', '');
        req.token = token
        next()
    }
    else {
        res.status(404).json({ msg: 'no auth provided' })
    }
}


const userExtractor = async (req, res, next) => {
    const u = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: u.id})
    req.user = user;

    next();
}

module.exports = {
    tokenExtractor, userExtractor
}