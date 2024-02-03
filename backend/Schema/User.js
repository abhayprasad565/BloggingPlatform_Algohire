const mongoose = require("mongoose");
const Post = require("./Post");

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,

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
    },

});
// mongoose middileware to delete data when this q is called
userSchema.post("findOneAndDelete", async (user) => {
    // delete all posts in the  array
    if (user) await Post.deleteMany({ author: { $in: user._id } })
})
const User = mongoose.model("User", userSchema);
module.exports = { User };