const pool = require('../config/db')

const getRecipeSearch = async (searchData) => {
    return new Promise((resolve,reject)=>{
    const {search, searchBy, offset, limit} = searchData
    console.log('Model: Get recipe table search')
        pool.query(`SELECT recipe.id, recipe.title, recipe.photo, recipe.ingredients, category.name AS category, users.username AS created_by FROM recipe JOIN category ON recipe.category = category.id JOIN users ON recipe.created_by = users.id WHERE ${searchBy} ILIKE '%${search}%' OFFSET ${offset} LIMIT ${limit}`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getRecipeCategoryUserAll = async () => {
    return new Promise((resolve,reject)=>{
    console.log("Model: Get recipe table")
        pool.query(`SELECT recipe.id, recipe.title, recipe.photo, recipe.ingredients, category.name AS category, users.username AS created_by FROM recipe JOIN category ON recipe.category = category.id JOIN users ON recipe.created_by = users.id`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const getRecipeTable = async () => {
    return new Promise((resolve,reject)=>{
    console.log("Model: Get recipe table")
        pool.query(`SELECT * FROM recipe`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const addRecipeTable = async (addData) => {
    return new Promise((resolve,reject)=>{
    console.log("Model: Add recipe table")
    const {id, title, photo, ingredients, category, created_by} = addData
        pool.query(`INSERT INTO recipe (id, title, photo, ingredients, category, created_by) VALUES (${id}, '${title}', '${photo}', '${ingredients}', ${category}, ${created_by}) RETURNING *`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const updateRecipeTable = async(updateData) => {
    return new Promise((resolve, reject)=>{
    console.log('Model: Update recipe table')
    const {id, title, photo, ingredients, category, created_by} = updateData
        pool.query(`UPDATE recipe SET title = '${title}', photo = '${photo}', ingredients = '${ingredients}', category = ${category}, created_by = ${created_by} WHERE id = ${id} RETURNING *`,(err, results)=>{
            if(!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const deleteRecipeTableById = (deleteData) => {
    return new Promise((resolve, reject)=>{
    console.log(`Model: Delete recipe with id`)
    const {id} = deleteData
        pool.query(`DELETE FROM recipe WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    getRecipeTable,
    addRecipeTable,
    updateRecipeTable,
    deleteRecipeTableById,
    getRecipeCategoryUserAll,
    getRecipeSearch
}