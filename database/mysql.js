let mysql = require('mysql');
let cfg = require('../config/default')

const pool = mysql.createPool({
    user: cfg.mysql.USER,
    password: cfg.mysql.PASS,
    port: cfg.mysql.PORT,
    host: cfg.mysql.HOST,
    database: cfg.mysql.DATABASE,
})

module.exports = function(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(result);
        })
    })
}