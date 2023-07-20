const pool = require('../config/db')

const checkIdRecipe = async (idcheck) => {
    return new Promise((resolve, reject)=>{
    console.log(`Model: Running check id ${idcheck}`)
        pool.query(`SELECT COUNT(*) FROM recipe WHERE id = ${idcheck}`, (err, results)=>{
            if(!err){
                resolve(results.rows[0].count > 0)
            } else {
                reject(err)
            }
        })
    })
}
const checkIdUser = async (idcheck) => {
    return new Promise((resolve, reject)=>{
    console.log(`Model: Running check id ${idcheck}`)
        pool.query(`SELECT COUNT(*) FROM users WHERE id = ${idcheck}`, (err, results)=>{
            if(!err){
                resolve(results.rows[0].count > 0)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    checkIdRecipe,
    checkIdUser
}