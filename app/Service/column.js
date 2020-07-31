const {
	Service
} = require("egg");

class ColumnService extends Service {
	async query(num) {
		let {
			app
		} = this;
		let result = await app.mysql.select("column", {
			limit: 10,
			offset: num,
		});
		if (result.length > 0) return result;
		return false;
	}
	async add(data) {
		let {
			app
		} = this;
		let result = await app.mysql.insert("column", data);
		if (result && result.affectedRows === 1) return true;
		return false;
	}
	async read(data) {
		let {
			app
		} = this;

		let result = await app.mysql.get("column", {
			id: data.id
		});
		console.log(result);
		if (result) return result;
		return false;
	}
	async update(data) {
		let {
			app
		} = this;
		let result = await app.mysql.update("column", data);
		if (result.affectedRows === 1) return true;
		return false;
	}
	async delete(data) {
		let {
			app
		} = this;
		let result = await app.mysql.delete('column', data)
		if(result.affectedRows === 1) return true;
		return false;
	}
}

module.exports = ColumnService;