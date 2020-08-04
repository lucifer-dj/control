const Service = require('egg').Service;

class RoleService extends Service{
	async queryAll(num){
		let { app } = this;
		let result = await app.mysql.select('role',{
			limit:10,
			offset: num
		})
		if(result.length>0) return result
			return false
	}
	async add(data){
		let { app } = this;
		let result = await app.mysql.insert('role',data)
		// console.log(result)
		if(result.affectedRows===1) return true
			return false
	}
	async read(data){
		let { app } = this;
		console.log(data)
		let result = await app.mysql.get('role', data)
		if(result) return result
			return false
	}
}

module.exports = RoleService