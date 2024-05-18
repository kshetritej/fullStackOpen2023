import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    username: {
        type: String,
        unique: true,
        minLength: 3,
    },
    passwordHash: String,
})

user.set("toJSON",{
    transform: (doc, returnObj) => {
        returnObj.id = returnObj._id.toString();
        delete returnObj._id;
        delete returnObj._v;
        delete returnObj.passwordHash;

    }
})

module.exports = mongoose.model("User", user);