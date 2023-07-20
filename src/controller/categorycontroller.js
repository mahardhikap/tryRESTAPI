const {getCategoryTable} = require('../model/categorymodel')

const categoryController = {
    getCategoryOnly: async (req, res) => {
        console.log('Control: Running get category table')
        try {
          const resultGetCategory = await getCategoryTable();
          console.log(resultGetCategory.rows);
          if (resultGetCategory) {
            res.status(200).json({ "status": 200, "message": "Ambil data category berhasil", data: resultGetCategory.rows });
          }
        } catch (error) {
          console.error(`Error ketika hendak mengambil data category: ${error.message}`);
          res.status(500).json({ "status": 500, "message": "Error terjadi ketika hendak akan mengambil data category" });
        }
    }
}

module.exports = categoryController