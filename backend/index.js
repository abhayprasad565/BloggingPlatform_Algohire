const express = require('express');
const { MONGOURL, PORT } = require("./config");
const port = PORT || 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')

// connect to mongodb
main().then(res => console.log("Connected to mongoDb")).catch(err => console.log(err));
async function main() {
    await mongoose.connect(MONGOURL)
}
const app = express();
// require routes
const accountRoute = require('./routes/account');
const postRoute = require("./routes/post");
const { isLoggedInMiddileware } = require("./Middilewares.js/authMiddileware");
// middilewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes 
app.use('/account', accountRoute);
app.use('/post', isLoggedInMiddileware, postRoute);



// 404 page
app.use("*", (req, res) => {
    console.log(req.path);
    return res.status(404).json({ message: "Page not Found" });
})
// default error handler
app.use((err, req, res, next) => {
    console.log(err.message || err.stack);
    return res.status(500).json({ message: err.message });
})
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Listening to port ${port}`);
})