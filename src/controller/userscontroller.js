const {getUsersTable, addUsersTable, checkIfIdExists, updateUsersTable, deleteUsersTableById} = require('../model/usersmodel')
const bcrypt = require('bcryptjs');

const usersController = {
    getUsersOnly: async (req, res) => {
        console.log('Control: Running get users table')
        try {
          const resultGetUsers = await getUsersTable();
          console.log(resultGetUsers.rows);
          if (resultGetUsers) {
            res.status(200).json({ "status": 200, "message": "Ambil data users berhasil", data: resultGetUsers.rows });
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data users: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "Error terjadi ketika hendak akan mengambil data users" });
        }
    },
    addUsersOnly: async (req, res) => {
        console.log('Control: Post data users')
        const {id, username, email, password} = req.body
        try {
            const isIdExists = await checkIfIdExists(id);
            if (isIdExists) {
                 res.status(400).json({ "status": 400, "message": "ID sudah digunakan" });
                 return console.log('Control: Tidak bisa membuat user, ditemukan indikasi id yang sama')
            }
            const userHash = await bcrypt.hash(password, 10)
            console.log(`Control: Add user berhasil dengan id ${id}`)
            let addDataUsers = {
                id: parseInt(id),
                username: username,
                email: email,
                password: userHash
            }
            const resultAddUsers = await addUsersTable(addDataUsers)
            res.status(201).json({"status":200,"message":"Tambah data users berhasil", addData:resultAddUsers.rows })
            console.log(resultAddUsers.rows)
        } catch (error) {
            console.error(`Error ketika hendak menambah data users: ${error.message}`)
            res.status(500).json({"status":500,"message":"Error terjadi ketika hendak menambah data users"})
        }
    },
    updateUsersOnly: async(req, res)=>{
        console.log('Control: Update data set')
        const {id} = req.params
        const {username, email, password} = req.body
        try {
            let dataUpdateUsers = {
                id: parseInt(id),
                username: username,
                email: email,
                password: password
            }
            const resultUpdateUsers = await updateUsersTable(dataUpdateUsers)
            res.status(200).json({"status":200,"message":"update data users",updateData:resultUpdateUsers.rows})
            console.log(resultUpdateUsers.rows)
        } catch (error) {
            console.error(`Error ketika hendak update data users: ${error.message}`)
            res.status(500).json({"status":500,"message":"Error terjadi ketika hendak akan update data users"})
        }
    },
    deleteUsersById: async(req, res)=>{
        console.log(`Control: Delete data by id`)
        const {id} = req.params
        try {
            let dataDeleteUsers = {
                id: parseInt(id)
            }
            const resultDeleteUsers = await deleteUsersTableById(dataDeleteUsers)
            res.status(200).json({"status":200,"message":"Delete data users berhasil", deleteData:resultDeleteUsers.rows})
            console.log(resultDeleteUsers.rows)
        } catch (error) {
            console.error(`Error ketika hendak hapus data users: ${error.message}`)
            res.status(500).json({"status":500,"message":"Error terjadi ketika hendak akan hapus data users"})
        }
    }
}

module.exports = usersController