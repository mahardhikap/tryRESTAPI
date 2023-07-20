const {getUsersOnly, addUsersOnly, updateUsersOnly, deleteUsersById} = require('../controller/userscontroller')
const app = require('express')
const router = app.Router()

router.get('/',getUsersOnly)
router.post('/',addUsersOnly)
router.put('/:id',updateUsersOnly)
router.delete('/:id',deleteUsersById)

module.exports = router