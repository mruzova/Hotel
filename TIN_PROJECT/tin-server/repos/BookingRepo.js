const db = require('../db_connection');

exports.getReservations = () => {
    return db.promise().query('SELECT roomNumber, dateOfArrival, dateOfDeparture, lastname FROM Room,Booking, Guest where room.idroom = booking.idroom and guest.idguest = booking.idguest')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createBooking = (newData) => {
    const idRoom = newData.idRoom;
    const idGuest = newData.idGuest;
    const dateOfArrival = newData.dateOfArrival;
    const dateOfDeparture = newData.dateOfDeparture;
    const sql = 'INSERT into Booking (idGuest,dateOfArrival,dateOfDeparture,idRoom) VALUES (?,?,?,?)';
    return db.promise().execute(sql, [idGuest, dateOfArrival, dateOfDeparture, idRoom]);

};

exports.updateBooking = (idBooking, newData) => {
    // const idGuest = newData.idGuest;
    const dateOfArrival = newData.dateOfArrival;
    const dateOfDeparture = newData.dateOfDeparture;
    // const idRoom = newData.idRoom;
    const sql = 'UPDATE Booking set dateOfArrival=? , dateOfDeparture=? where idBooking = ?';
    return db.promise().execute(sql, [dateOfArrival, dateOfDeparture, idBooking]);

};

exports.deleteBooking = (idBooking) => {
    const sql = 'DELETE from Booking where idBooking = ?';
    return db.promise().execute(sql, [idBooking]);
};
exports.getReservationsByGuest = (idUser) => {
    const sql = 'SELECT * FROM booking,room where idGuest in (select idGuest from guest where booking.idroom=room.idroom and email in (select email from users where idUser=?))';
    return db.promise().query(sql, [idUser]).then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}