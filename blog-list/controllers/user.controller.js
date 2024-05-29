const userRouter = require("express").Router();
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs",{title: 1});
    return res.status(200).json(users)
});

userRouter.post("/register", async (req, res) => {

    if (!req.body.password || req.body.password.length < 3) {
        return res.status(400).json({ "message": "password is required and must be longer than 3 characters!" })
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (!req.body.name || !req.body.username || !hashPassword) {
        return res.status(400).json({ "message": "all fields are required" })
    }

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        passwordHash: hashPassword,
    });

    await user.save();
    return res.status(201).json(user)
})


userRouter.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    const passwordVerified = user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if(!(user && passwordVerified)){
        return res.status(401).json({message: "Invalid credentials"})
    }

    const userForToken = {
        username: user.username,
        id : user._id,
    }
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: 60*60});

    res.status(201).json({
        "token":token,
        "username":user.username,
        "name": user.name
    });

    
})
module.exports = userRouter;