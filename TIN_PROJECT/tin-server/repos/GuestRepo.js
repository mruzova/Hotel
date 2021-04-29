const db = require('../db_connection');

exports.getGuests = () => {
    return db.promise().query('SELECT firstName, lastName, dateOfBirth, country, city, email FROM Guest')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

// exports.createGuest = (newData) => {
//     const firstName = newData.firstName;
//     const lastName = newData.lastName;
//     const dateOfBirth = newData.dateOfBirth;
//     const country = newData.country;
//     const city = newData.city;
//     const email = newData.email;
//     const sql = 'INSERT into Guest (firstName, lastName, dateOfBirth, country, city, email) VALUES (?,?,?,?,?,?)';
//     return db.promise().execute(sql, [firstName, lastName, dateOfBirth, country, city, email]);

// };

exports.updateGuest = (idGuest, newData) => {
    const firstName = newData.firstName;
    const lastName = newData.lastName;
    const dateOfBirth = newData.dateOfBirth;
    const country = newData.country;
    const city = newData.city;
    const sql = 'UPDATE Guest set firstName=?, lastName=?, dateOfBirth=?, country=?, city=? where idGuest = ?';
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, country, city, idGuest]);

};

exports.deleteGuest = (idGuest) => {
    const sql = 'DELETE from Booking where idGuest = ?';
    const sql1 = 'delete from users where email in (select email from guest where idguest= ?)';
    return db.promise().execute(sql, [idGuest])
        .then(() => {
            return db.promise().execute(sql1, [idGuest]);
        })
};
exports.getAuthorizedUserData = (idUser) => {
    const sql = 'SELECT idGuest, firstName, lastName, dateOfBirth, country, city from guest where email in (select email from users where idUser=?)';
    return db.promise().query(sql, [idUser]).then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });;
}