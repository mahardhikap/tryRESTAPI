const {getCategoryOnly} = require('../controller/categorycontroller')
const app = require('express')
const router = app.Router()

router.get('/',getCategoryOnly)

module.exports = router