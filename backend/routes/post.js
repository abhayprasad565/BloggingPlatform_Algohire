const express = require("express");
const router = express.Router();
const { Post } = require('../Schema/Post');
const { User } = require('../Schema/User');
const { validatePost } = require("../Middilewares.js/schemaAuth");


// returns trending category in pas 15 days
const findTrendingPosts = async () => {
    const tenDaysAgoTimestamp = Date.now() - (15 * 24 * 60 * 60 * 1000);
    const trending = await Post.aggregate([
        { $match: { createdAt: { $gte: new Date(tenDaysAgoTimestamp) } } },
        { $group: { _id: "$category" } },
        { $limit: 5 }
    ]).exec();
    return trending;
}

// get all posts
router.get("/:category", async (req, res, next) => {
    try {
        // search based on categry filter
        const query = {};
        const { category } = req.params;
        if (category) query = { ...query, category: category };
        // get all posts and populate authors and sort according to the time created 
        const allPosts = await Post.find(query).populate('author', 'firstName lastName username',).sort({ createdAt: 1 });
        const trending = await findTrendingPosts();
        return res.json({ posts: allPosts, tranding: trending });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// add new post
router.post("/", async (req, res) => {
    try {
        const post = req.body.post;
        const validate = validatePost(post);
        if (!validate) return res.status(404).json({ message: "Invalid Inputs" });
        const userId = req.userId;
        const dbPost = await Post.create({ ...post, author: userId });
        dbPost.save();
        return res.json({ message: "Post added Sucessfully" });
    } catch (err) {
        console.log(err.message || err.stack);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// update post
router.put("/:id", async (req, res) => {
    try {
        // validate post 
        const post = req.body.post;
        const validate = validatePost(post);
        if (!validate) return res.status(404).json({ message: "Invalid Inputs" });
        const userId = req.userId;
        // find user and check permission
        if (userId != post.author) return res.status(403).json({ message: "Permission Denied" });
        // find post and update
        const dbPost = await Post.findById(post._id);
        if (!dbPost) return res.status(403).json({ message: "Permission Denied" });
        const { title, category, content } = post;
        if (title) dbPost.title = title;
        if (category) dbPost.category = category;
        if (content) dbPost.content = content;
        // save and respond
        await dbPost.save();
        return res.json({ message: "Post Updated Sucessfully" });
    } catch (err) {
        console.log(err.message || err.stack);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})
module.exports = router;