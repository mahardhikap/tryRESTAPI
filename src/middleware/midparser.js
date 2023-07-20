const bodyParser = require('body-parser')
const cors = require("cors");

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const usecors = (cors(corsOptions))
const bodyjson = (bodyParser.json())
const bodyurlencoded = (bodyParser.urlencoded({extended: true}))

module.exports = {
    bodyjson, 
    bodyurlencoded,
    usecors
}