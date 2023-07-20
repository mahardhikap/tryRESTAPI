const express = require('express')
const {bodyjson, bodyurlencoded, usecors} = require('./src/middleware/midparser')
require('dotenv').config({ path: './src/environment/.env' })
const app = express()
const port = 4000
const morgan = require("morgan");
const router = require('./src/router')

app.use(usecors)
app.use(bodyjson)
app.use(bodyurlencoded)

app.use(morgan("combined"));

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use(router);

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}.`)
})