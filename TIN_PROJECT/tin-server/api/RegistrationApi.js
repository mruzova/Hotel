const Cryptr = require('cryptr');
const db = require('../db_connection');
const cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function(req, res) {
    var today = new Date();

    var encryptedString = cryptr.encrypt(req.body.password);
    var users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": encryptedString,
        "created_at": today,
        "updated_at": today,
        "is_admin": 0
    }
    db.query('select * from users where email= \'' + users.email + '\'', function(err, result) {
        if (result.length === 0) {

            db.query('INSERT INTO users SET ?', users, function(error, results, fields) {

                if (error) {
                    res.json({
                        status: false,
                        message: 'error!!!'
                    })
                } else {
                    res.json({
                        status: true,
                        data: results,
                        is_admin: users.is_admin,
                        token: users.password,
                        message: 'registration succeeded!'
                    })
                    db.promise().execute('INSERT INTO guest (email) VALUES (?)', [users.email]);
                }
            });
        } else {
            res.json({
                status: false,
                message: 'user with such email already registered'
            })
        }

    });


}