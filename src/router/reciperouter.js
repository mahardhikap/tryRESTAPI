const {getRecipeOnly, addRecipeOnly, updateRecipeOnly, deleteRecipeById, getRecipeCategoryUserOnly, getRecipeSearching} = require('../controller/recipecontroller')
const app = require('express')
const router = app.Router()


router.get('/all',getRecipeCategoryUserOnly)
router.get('/',getRecipeSearching)
router.get('/',getRecipeOnly)
router.post('/',addRecipeOnly)
router.put('/:id',updateRecipeOnly)
router.delete('/:id',deleteRecipeById)

module.exports = router;