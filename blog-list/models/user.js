const mongoose = require('mongoose')
const user = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    username: {
        required: true,
        type: String,
        unique: true,
        minLength: 3,
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
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