const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
});

userRouter.post("/", async (req, res) => {
    const user = new User(req.body);
    if (!user.name || !user.username || !user.password) {
        return res.status(400).json({ "message": "all fields are required" })
    }

    const hashPassword = await bcrypt.hash(user.password, 10);
    user.passwordHash = hashPassword
    await user.save();
    return res.status(201).json(user)
})