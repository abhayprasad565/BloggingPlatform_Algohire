const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        immutable: true
    },
    lastName: {
        type: String,
        required: true,
        immutable: true
    },
    username: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;