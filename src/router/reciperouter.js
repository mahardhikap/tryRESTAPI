const {getRecipeOnly, addRecipeOnly, updateRecipeOnly, deleteRecipeById, getRecipeCategoryUserOnly, getRecipeSearching, getRecipeSorted} = require('../controller/recipecontroller')
const app = require('express')
const router = app.Router()


router.get('/joined',getRecipeCategoryUserOnly)
router.get('/sorted',getRecipeSorted)
router.get('/searched',getRecipeSearching)
router.get('/',getRecipeOnly)
router.post('/',addRecipeOnly)
router.put('/:id',updateRecipeOnly)
router.delete('/:id',deleteRecipeById)

module.exports = router;