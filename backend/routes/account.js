const express = require('express');
const router = express.Router();
const User = require('../Schema/User');
const { validateUser, loginSchemaValidate } = require('../Middilewares.js/schemaAuth');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config');
const bcrypt = require('bcrypt');
const { isLoggedInMiddileware } = require("../Middilewares.js/authMiddileware");

// user account validation route
const signupUser = async (req, res, next) => {
    try {
        // valideat the schema
        const user = req.body.user;
        const validate = validateUser(user);
        if (!validate) return res.status(400).json({ message: "Wrong Inputs" });
        // check if user already exixts 
        const existingUser = User.findOne({ username: user.username });
        if (existingUser) return res.status(400).json("User already Exists");
        // hash the password
        user.password = bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) throw new Error("Password Encrypition failed");
            else {
                console.log("password hashed");
            }
        });
        const dbUser = User.create(user);
        // create user in the database
        await dbUser.save();
        if (!dbUser) throw new Error("Database User Signup failed");
        else return res.status(200).json({ message: "User Created Sucessfully" })

    } catch (err) {
        console.log(err.message);
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
        const dbUser = User.findOne({ username: user.username });
        if (!dbUser) return res.status(400).json("user doesnt exists");
        // compare passwords
        const match = await bcrypt.compare(user.password, dbUser.password);
        if (!match) return res.status(403).json({ message: "Invalid Passowrd" });
        // generate token
        const token = jwt.sign({
            username: user.user,
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

router.put("/edit", isLoggedInMiddileware, (req, res, next) => {

})

module.exports = router;