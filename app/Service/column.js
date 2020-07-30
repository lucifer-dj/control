const { Service } = require('egg');

class ColumnService extends Service{
	async findColumns(num){
		let { app } = this;
		let result = await app.mysql.select('column',{
			limit:10,
			offset:num
		})
		console.log(result)
		return result
	}
	async add(data){
		let { app } = this;
		let result = await app.mysql.insert('column',{
			name: data.name,
			show: data.show,
			sort: data.sort,
			columnpic: data.columnpic,
			description: data.description,
			keywords: data.keywords,
			origin: data.origin,
			template: data.template
		})
		if(result && result.affectedRows===1)return true;
		else return false;
	}
	async read(data){
		let { app } = this;
		let result = await app.mysql.get('column',{id:data.id})
		console.log(result)
		if(result) return result
		else return false
	}
	async update(data){
		let { app } = this;
		// let result = await app.mysql.update(req)
		return '更新一条数据'
	}
}

module.exports = ColumnService