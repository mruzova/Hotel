const { json } = require('body-parser');
const db = require('../db_connection');

exports.getRooms = (page) => {
    const limit = 5;
    const offset = (page - 1) * limit;
    var count;
    db.query(('SELECT count(*) as total_rows from room'), function(err, res) {
        count = res[0];
    });

    return db.promise().query('SELECT * FROM Room, Category where room.idcategory = category.idcategory limit ' + limit + " offset " + offset)
        .then((results, fields) => {


            var jsonResult = {
                    count,
                    'rooms_page_count': results[0].length,
                    'page_number': page,
                    'rooms': results[0]
                }
                // console.log(jsonResult);
            return jsonResult;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createRoom = (newData) => {
    const roomNumber = newData.roomNumber;
    const pricePerNight = newData.pricePerNight;
    const imageUrl = newData.imageUrl;
    const idCategory = newData.idCategory;
    const sql = 'INSERT into Room (idCategory, roomNumber,pricePerNight, imageUrl) VALUES (?,?,?,?)';
    return db.promise().execute(sql, [idCategory, roomNumber, pricePerNight, imageUrl]);

};

exports.updateRoom = (idRoom, newData) => {
    const roomNumber = newData.roomNumber;
    const pricePerNight = newData.pricePerNight;
    const imageUrl = newData.imageUrl;
    const idCategory = newData.idCategory;
    const sql = 'UPDATE Room set idCategory=?, roomNumber=? ,pricePerNight=?, imageUrl=? where idRoom = ?';
    return db.promise().execute(sql, [idCategory, roomNumber, pricePerNight, imageUrl, idRoom]);

};

exports.deleteRoom = (idRoom) => {
    const sql = 'DELETE from Booking where idRoom = ?';
    const sql1 = 'DELETE from Room where idRoom = ?';
    return db.promise().execute(sql, [idRoom])
        .then(() => {
            return db.promise().execute(sql1, [idRoom]);
        })
};
exports.getRoomById = (idRoom) => {
    const sql = 'SELECT * from Room where idRoom = ?';
    return db.promise().query(sql, [idRoom]).then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });;
}