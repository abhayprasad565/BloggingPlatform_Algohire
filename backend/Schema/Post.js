const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    category: {
        type: String,
        default: "All",
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const Post = mongoose.model("Post", postSchema);
module.exports = { Post };