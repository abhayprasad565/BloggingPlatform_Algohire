require('dotenv').config()
const MONGOURL = process.env.MONGOURL;
const JWTSECRET = process.env.JWTSECRET;
const PORT = process.env.PORT;


module.exports = { MONGOURL, JWTSECRET, PORT };