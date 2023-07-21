const {getRecipeTable, addRecipeTable, updateRecipeTable, deleteRecipeTableById, getRecipeCategoryUserAll, getRecipeSearch, getRecipeSort} = require('../model/recipemodel')
const {checkIdRecipe} = require('../helper/validate')

const recipeController = {
    getRecipeSearching : async (req, res) => {
        console.log('Control: Running searching')
        const {search, searchBy, offset, limit} = req.query
        try {
        let dataSearching = {
            searchBy: searchBy || 'title',
            search: search || '',
            offset: offset || 0,
            limit: limit || 5
        }
          const resultGetRecipeSearch = await getRecipeSearch(dataSearching);
          if (resultGetRecipeSearch.rowCount > 0) {
              res.status(200).json({ "status": 200, "message": "Mendapatkan semua data recipe by search berhasil", data: resultGetRecipeSearch.rows });
              console.log(resultGetRecipeSearch.rows)
            } else {
                res.status(404).json({ "status": 404, "message": "Data tidak ditemukan", data: "Data tidak ditemukan" });
                console.log('Data tidak ditemukan')
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data recipe by search: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "Error terjadi ketika hendak akan mengambil data recipe by search" });
        }
    },
    getRecipeSorted : async (req, res) => {
        console.log('Control: Running searching')
        const{sortby, sort, offset, limit} = req.query
        try {
        let dataSort = {
            sortby: sortby || 'created_at',
            sort: sort || 'ASC',
            offset: offset || 0,
            limit: limit || 5
        }
          const resultRecipeSort = await getRecipeSort(dataSort);
          if (resultRecipeSort.rowCount > 0) {
              res.status(200).json({ "status": 200, "message": "Mendapatkan semua data recipe by sort berhasil", data: resultRecipeSort.rows });
              console.log(resultRecipeSort.rows)
            } else {
                res.status(404).json({ "status": 404, "message": "Data tidak ditemukan", data: "Data tidak ditemukan" });
                console.log('Data tidak ditemukan')
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data recipe by sort: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "Error terjadi ketika hendak akan mengambil data recipe by sort" });
        }
    },
    getRecipeCategoryUserOnly: async (req, res) => {
        console.log('Control: Running get all recipe category user table')
        try {
          const resultGetRecipeAll = await getRecipeCategoryUserAll();
          if (resultGetRecipeAll.rowCount > 0) {
              res.status(200).json({ "status": 200, "message": "Mendapatkan semua data recipe category user berhasil", data: resultGetRecipeAll.rows });
              console.log(resultGetRecipeAll.rows);
          } else {
            res.status(404).json({ "status": 404, "message": "Data tidak ditemukan", data: "Data tidak ditemukan" });
            console.log('Data tidak ditemukan')
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data all recipe category user: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "Error terjadi ketika hendak akan mengambil data recipe category user" });
        }
      },
    getRecipeOnly: async (req, res) => {
        console.log('Control: Running get recipe table')
        try {
          const resultGetRecipe = await getRecipeTable();
          if (resultGetRecipe.rowCount > 0) {
              res.status(200).json({ "status": 200, "message": "Mendapatkan data recipe berhasil", data: resultGetRecipe.rows });
              console.log(resultGetRecipe.rows);
          } else {
            res.status(404).json({ "status": 404, "message": "Data tidak ditemukan", data: "Data tidak ditemukan" });
            console.log('Data tidak ditemukan')
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data resep: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "Error terjadi ketika hendak akan mengambil data recipe" });
        }
      },
    addRecipeOnly: async (req, res) => {
        console.log('Control: Post data recipe')
        const {id, title, photo, ingredients, category, created_by} = req.body
        try {
            const isIdExists = await checkIdRecipe(id);
            if (isIdExists) {
                 res.status(400).json({ "status": 400, "message": "ID tersebut sudah digunakan" });
                 return console.log('Control: Tidak bisa post, ditemukan indikasi id yang sama pada post kali ini')
            } 
            console.log(`Control: Post berhasil dengan id ${id}`)
            let addDataRecipe = {
                id: parseInt(id),
                title: title,
                photo: photo,
                ingredients: ingredients,
                category: parseInt(category),
                created_by: parseInt(created_by)
            }
            const resultAddRecipe = await addRecipeTable(addDataRecipe)
            res.status(201).json({"status":200,"message":"Tambah data recipe berhasil", addData:resultAddRecipe.rows })
            console.log(resultAddRecipe.rows)
        } catch (error) {
            console.error(`Error ketika hendak menambah data recipe: ${error.message}`)
            res.status(500).json({"status":500,"message":"Error terjadi ketika hendak menambah data recipe"})
        }
    },
    updateRecipeOnly: async(req, res)=>{
        console.log('Control: Update data set')
        const {id} = req.params
        const {title, photo, ingredients, category, created_by} = req.body
        try {
            let dataUpdateRecipe = {
                id: parseInt(id),
                title: title,
                photo: photo,
                ingredients: ingredients,
                category: parseInt(category),
                created_by: parseInt(created_by)
            }
            const resultUpdateRecipe = await updateRecipeTable(dataUpdateRecipe)
            if(resultUpdateRecipe.rowCount > 0){
              res.status(200).json({"status":200,"message":"Update data recipe",updateData:resultUpdateRecipe.rows})
              console.log(resultUpdateRecipe.rows)
            } else {
              res.status(404).json({ "status": 404, "message": "Data tidak ditemukan", data: "Data tidak ditemukan" });
              console.log('Data tidak ditemukan')
            }
        } catch (error) {
            console.error(`Error ketika hendak update data recipe: ${error.message}`)
            res.status(500).json({"status":500,"message":"Error terjadi ketika hendak akan update data recipe"})
        }
    },
    deleteRecipeById: async(req, res)=>{
        console.log(`Control: Delete data by id`)
        const {id} = req.params
        try {
            let dataDeleteRecipe = {
                id: parseInt(id)
            }
            const resultDeleteRecipe = await deleteRecipeTableById(dataDeleteRecipe)
            if(resultDeleteRecipe.rowCount > 0){
              res.status(200).json({"status":200,"message":"Delete data recipe success", deleteData:resultDeleteRecipe.rows})
              console.log(resultDeleteRecipe.rows)
            } else {
              res.status(404).json({ "status": 404, "message": "Data tidak ditemukan", data: "Data tidak ditemukan" });
              console.log('Data tidak ditemukan')
            }
        } catch (error) {
            console.error(`Error ketika hendak hapus data recipe: ${error.message}`)
            res.status(500).json({"status":500,"message":"Error terjadi ketika hendak akan hapus data recipe"})
        }
    }
}

module.exports = recipeController