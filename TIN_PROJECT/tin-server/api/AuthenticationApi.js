const Cryptr = require('cryptr');
const db = require('../db_connection');
const cryptr = new Cryptr('myTotalySecretKey');
module.exports.authenticate = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;


    db.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'error!!!'
            })
        } else {

            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    res.json({
                        status: true,
                        data: results,
                        token: results[0].password,
                        message: 'authentication succeeded!'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email and password do not match"
                    });
                }

            } else {
                res.json({
                    status: false,
                    message: "No such email"
                });
            }

        }
    });
}