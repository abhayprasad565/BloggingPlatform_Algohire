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
// middilewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes 
app.use('/account', accountRoute);


app.get("/", (req, res) => {

})










app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Listening to port ${port}`);
})