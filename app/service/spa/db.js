"use strict";
const Service = require("egg").Service;

class DbService extends Service {
	//查询多条数据
	async select(table, obj = {}) {
		let { app } = this;
		try {
			let db = app.mysql.get("spa");
			let result = await db.select(table, obj);
			if (result.length > 0) return result;
			return [];
		} catch (e) {
      console.log(e);
			return [];
		}
	}
	//添加一条数据
	async add(table, data) {
		let { app } = this;
		try {
			let db = app.mysql.get("spa");
			let result = await db.insert(table, data);
			if (result.affectedRows === 1) return { insertId: result.insertId };
			return false;
		} catch (e) {
      console.log(e);
			return false;
		}
	}
	//读取一条数据
	async get(table, data) {
		let { app } = this;
		try {
			console.log(table);
			let db = app.mysql.get("spa");
			let result = await db.get(table, data);
			if (result) return result;
			return false;
		} catch (e) {
      console.log(e);
			return false;
		}
	}
	//删除一条数据
	async deleteSingle(table, data) {
		let { app } = this;
		try {
			console.log(data);
			let db = app.mysql.get("spa");
			let result = await db.delete(table, data);
			if (result.affectedRows === 1) return true;
			return false;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	//更新一条数据
	async update(table, data, opts = {}) {
		let { app } = this;
		try {
			let db = app.mysql.get("spa");
			let result = await db.update(table, data, opts);
			if (result.affectedRows === 1) return true;
			return false;
		} catch (e) {
      console.log(e);
			return false;
		}
	}
}

module.exports = DbService;
