const pool = require('../config/db')

const getCategoryTable = async () => {
    return new Promise((resolve,reject)=>{
    console.log("Model: Get category table")
        pool.query(`SELECT * FROM category`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

module.exports = {
    getCategoryTable
}