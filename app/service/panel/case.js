const Service = require('egg').Service;

class CaseService extends Service{
	async queryAll(num){
		let { app } = this;
		let result = await app.mysql.select('case',{
			limit:10,
			offset: num
		})
		if(result.length>0) return result
			return false
	}
	async add(data){
		let { app } = this;
		let result = await app.mysql.insert('case',data)
		if(result.affectedRows===1) return true
			return false
	}
	async read(data){
		let { app } = this;
		let result = await app.mysql.get('case', data)
		if(result) return result
			return false
	}
	async delete(data){
		let { app } = this;
		let result = await app.mysql.delete('case',data)
		if(result.affectedRows===1) return true
			return false
	}
	async update(data){
		let { app } = this;
		let result = await app.mysql.update('case',data)
		if(result.affectedRows===1) return true
			return false
	}
}

module.exports = CaseService