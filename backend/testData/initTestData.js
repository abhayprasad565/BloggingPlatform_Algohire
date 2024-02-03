const mongoose = require("mongoose");
const { generateRandomUser } = require("./user.js");
const { generateFakePost } = require("./posts.js");
const { Post } = require("../Schema/Post.js");
const { User } = require("../Schema/User.js");
const { MONGOURL } = require("../config.js");
const bcrypt = require('bcrypt');

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGOURL);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
connectToDatabase();

// initialize the data 
const initDB = async () => {
    // delete previous data
    await Post.deleteMany({});
    await User.deleteMany({});
    console.log("data was deleted");
    // add required no of data
    for (let i = 0; i < 25; i++) {
        const randomUser = (generateRandomUser());
        let { password } = randomUser;
        console.log(password);
        randomUser.password = await bcrypt.hash(password, 10);
        const dbUser = await User.create(randomUser);
        // for each user add required no of posts
        for (let j = 0; j < 15; j++) {

            const randomPost = { ...generateFakePost(), author: dbUser._id };
            console.log(randomPost);
            const dbPost = Post.create(randomPost);
            //await Post.save();
        }
    }
    // logg sucessfull
    console.log("data was initialized");
}
initDB();