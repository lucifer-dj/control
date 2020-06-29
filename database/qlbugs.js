let query = require('./mysql')
class Bugs {
    constructor() {}
    addBug(arr) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO bugs(id,title,state,class,auth,start,end,text,changer) VALUES(0,?,?,?,?,?,?,?,?)'
            query(sql, arr).then(result=>{
				resolve(result);
			},err=>{
				reject(err)
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