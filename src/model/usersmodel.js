const pool = require('../config/db')

const getUsersTable = async () => {
    return new Promise((resolve,reject)=>{
    console.log("Model: Get users table")
        pool.query(`SELECT * FROM users`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const addUsersTable = async (addData) => {
    return new Promise((resolve,reject)=>{
    console.log("Model: Add users table")
    const {id, username, email, password} = addData
        pool.query(`INSERT INTO users (id, username, email, password) VALUES (${id}, '${username}', '${email}', '${password}') RETURNING *`,(err,results)=>{
            if(!err){
                resolve(results)
            } else{
                reject(err)
            }
        })
    })
}

const checkIfIdExists = async (idcheck) => {
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

const updateUsersTable = async(updateData) => {
    return new Promise((resolve, reject)=>{
    console.log('Model: Update users table')
    const {id, username, email, password} = updateData
        pool.query(`UPDATE users SET username = '${username}', email = '${email}', password = '${password}' WHERE id = ${id} RETURNING *`,(err, results)=>{
            if(!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const deleteUsersTableById = (deleteData) => {
    return new Promise((resolve, reject)=>{
    console.log(`Model: Delete users with id`)
    const {id} = deleteData
        pool.query(`DELETE FROM users WHERE id = ${id} RETURNING *`, (err, results)=>{
            if(!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    getUsersTable,
    addUsersTable,
    checkIfIdExists,
    updateUsersTable,
    deleteUsersTableById
}