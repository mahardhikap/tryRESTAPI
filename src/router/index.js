const recipe = require('./reciperouter')
const category = require('./categoryrouter')
const users = require('./usersrouter')
const app = require('express')
const router = app.Router()

router.use('/recipe',recipe)
router.use('/category',category)
router.use('/users',users)

module.exports = router;