const { Service } = require("egg");

class ColumnService extends Service {
	async queryAll() {
		let { app } = this;
		let result = await app.mysql.select("column");
		if (result.length > 0) return result;
		return false;
	}
	async add(data) {
		let { app } = this;
		let result = await app.mysql.insert("column", data);
		if (result.affectedRows === 1) return true;
		return false;
	}
	async read(data) {
		let { app } = this;
		let result = await app.mysql.get("column", {
			id: data.id 
		});
		if (result) return result;
		return false;
	}
	async update(data) {
		let { app } = this;
		let result = await app.mysql.update("column", data);
		if (result.affectedRows === 1) return true;
		return false;
	}
	async delete(data) {
		let { app } = this;
		let result = await app.mysql.delete('column', data)
		if(result.affectedRows === 1) return true;
		return false;
	}
}

module.exports = ColumnService;