let query = require('./mysql')
class Bugs {
    constructor() {}
    addBug(arr) {
        return new Promise((resolve, reject) => {
            let sql = 'insert into bugs (id,title,state,class,auth,start,end,text,changer) VALUES (0,?,?,?,?,?,?,?,?)'
            query(sql, arr, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err)
                }
                resolve(result)
            })
        })

    }
    queryAll() {
        return new Promise((resolve, reject) => {
            let sql = 'select * from bugs'
            query(sql).then(res => {
                resolve(res)
            }, e => {
                reject(e)
            })
        })
    }
}

module.exports = new Bugs();