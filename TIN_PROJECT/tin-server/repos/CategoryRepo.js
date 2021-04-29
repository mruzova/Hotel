const db = require('../db_connection');

exports.getCategories = (page) => {
    const limit = 5;
    const offset = (page - 1) * limit;
    var count;
    db.query(('SELECT count(*) as total_rows from category'), function(err, res) {
        count = res[0];
    });
    return db.promise().query('SELECT * FROM Category limit ' + limit + " offset " + offset)
        .then((results, fields) => {
            var jsonResult = {
                count,
                'categories_page_count': results[0].length,
                'page_number': page,
                'categories': results[0]
            }

            return jsonResult;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createCategory = (newData) => {
    const numberOfBeds = newData.numberOfBeds;
    const roomType = newData.roomType;
    const sizeType = newData.sizeType;
    const imagePlanUrl = newData.imagePlanUrl;
    const sql = 'INSERT into Category (numberOfbeds, roomType, sizeType, imagePlanUrl) VALUES (?,?,?,?)';
    return db.promise().execute(sql, [numberOfBeds, roomType, sizeType, imagePlanUrl]);

};

exports.updateCategory = (idCategory, newData) => {
    const numberOfBeds = newData.numberOfBeds;
    const roomType = newData.roomType;
    const sizeType = newData.sizeType;
    const imageUrl = newData.imagePlanUrl;
    const sql = 'UPDATE Category set numberOfBeds = ?, roomType = ?, sizeType = ?, imagePlanUrl=? where idCategory = ?';
    return db.promise().execute(sql, [numberOfBeds, roomType, sizeType, imageUrl, idCategory]);
};

exports.deleteCategory = (idCategory) => {
    const sql = 'DELETE from Room where idCategory = ?';
    const sql1 = 'DELETE from Category where idCategory = ?';
    return db.promise().execute(sql, [idCategory])
        .then(() => {
            return db.promise().execute(sql1, [idCategory]);
        })
};