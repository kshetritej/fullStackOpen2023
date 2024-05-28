const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
});

userRouter.post("/register", async (req, res) => {

    if(req.body.password.length < 3 ){
        return res.status(400).json({"message":"password must be longer than 3 characters!"})
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (!req.body.name || !req.body.username || !hashPassword) {
        return res.status(400).json({ "message": "all fields are required" })
    }


    const user = new User({
        name : req.body.name,
        username : req.body.username,
        passwordHash: hashPassword,
    });

    await user.save();
    return res.status(201).json(user)
})

module.exports = userRouter;