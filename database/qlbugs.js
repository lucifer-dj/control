let query = require('./mysql')
class Bugs {
    constructor() {}
    addBug(arr) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO bugs(id,title,state,class,auth,start,end,text,changer) VALUES(0,?,?,?,?,?,?,?,?)'
            query(sql, arr).then(result => {
                resolve(result);
            }, err => {
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
    deleteBug(id) {
        return new Promise((resolve, reject) => {
            let sql = `delete from bugs where id=${id}`;
            query(sql).then(result => {
                resolve(result)
            }, err => {
                reject(err)
            })
        })
    }
    getBug(id) {
        return new Promise((resolve, reject) => {
            console.log(id)
            let sql = 'select * from bugs where id=' + id
            query(sql).then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    }
    updateBug(arr) {
        return new Promise((resolve, reject) => {
            let sql = 'update bugs set title=?,class=?,text=? where id=?'
            query(sql, arr).then(result => {
                resolve(result)
            }, err => {
                reject(err)
            })
        })
    }
	repqirBug(arr){
		return new Promise((resolve,reject)=>{
			let sql = "update bugs set state=?,end=? where id=?"
			query(sql,arr).then(result=>{
				resolve(result)
			},err=>{
				reject(err)
			})
		})
	}
}

module.exports = new Bugs();