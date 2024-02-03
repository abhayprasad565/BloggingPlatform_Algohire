const express = require('express');
const router = express.Router();
const { User } = require('../Schema/User');
const { validateUser, loginSchemaValidate } = require('../Middilewares.js/schemaAuth');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config');
const bcrypt = require('bcrypt');
const { isLoggedInMiddileware, isOwnerMiddileware } = require("../Middilewares.js/authMiddileware");
const { Post } = require('../Schema/Post');

// user account validation route
const signupUser = async (req, res, next) => {
    try {
        // valideat the schema
        const user = req.body.user;
        const validate = validateUser(user);
        if (!validate) return res.status(400).json({ message: "Wrong Inputs" });
        // check if user already exixts 
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) return res.status(400).json("User already Exists");
        // hash the password
        user.password = await bcrypt.hash(user.password, 10);
        const dbUser = await User.create(user);
        // create user in the database
        if (!dbUser) throw new Error("Database User Signup failed");
        else return res.status(200).json({ message: "User Created Sucessfully" })

    } catch (err) {
        console.log(err.message || err.stack);
        return res.status(500).json({ message: "Internal Server Error" })
    }
    next();
}
const loginUser = async (req, res, next) => {
    try {
        const user = req.body.user;
        const validate = loginSchemaValidate(user);
        if (!validate) return res.status(400).json({ message: "Invalid Inputs" });
        // check if user Exixts 
        const dbUser = await User.findOne({ username: user.username });
        if (!dbUser) return res.status(400).json("user doesnt exists");
        // compare passwords
        const match = await bcrypt.compare(user.password, dbUser.password);
        if (!match) return res.status(403).json({ message: "Invalid Passowrd" });
        // generate token
        const token = jwt.sign({
            username: user.username,
            userID: dbUser._id
        }, JWTSECRET);
        return res.status(200).json({ message: "Login Sucessfull", token: token });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    next();
}
// signup user
router.post("/signup", signupUser);
// login user
router.post("/login", loginUser);
// update user
router.put("/edit", isLoggedInMiddileware, isOwnerMiddileware, async (req, res) => {
    try {
        const user = req.body.user;
        // validate user
        const validate = validateUser(user);
        if (!validate) return res.status(403).json({ message: "Bad request" });
        // check user exists
        const dbUser = await User.findOne({ username: user.username });
        if (!dbUser) return res.status(403).json({ message: "Invalid User" })
        // update user
        const { firstName, lastName, password } = user;
        password = await bcrypt.hash(password, 10);
        if (firstName) dbUser.firstName = firstName;
        if (lastName) dbUser.lastName = lastName;
        if (password) dbUser.password = password;
        await dbUser.save();
        // save and return response
        res.json({ message: "User updated Sucessfully" });
    }
    catch (err) {
        console.log(err.message || err.stack);
        return res.status(500).json({ message: "Internal Server error" });
    }
});
// get user details by username
router.get("/user", isLoggedInMiddileware, async (req, res) => {
    try {
        console.log(req.username);
        const dbUser = await User.findOne({ username: req.username });
        if (!dbUser) return res.status(400).json("User doesnt exist");
        const dbUserPosts = await Post.find({ author: dbUser._id });
        // return user and filter pass on return
        const user = {
            username: dbUser.username,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            createdAt: dbUser.createdAt,
            posts: dbUserPosts
        }
        return res.json({ message: "User Fetched Sucessfully", user: user });
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json("Internal Server Error at edit");
    }
})
module.exports = router;