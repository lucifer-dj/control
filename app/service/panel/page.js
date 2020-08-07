const Service = require('egg').Service;

class CaseService extends Service{

	async read(data){
		let { app } = this;
		let result = await app.mysql.get('page', data)
		if(result) return result
			return false
	}
	async add(data){
		let { app } = this;
		let result = await app.mysql.insert('page', data)
		if(result.affectedRows === 1) return result
			return false
	}
}

module.exports = CaseService