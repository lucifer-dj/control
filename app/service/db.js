"use strict";
const Service = require("egg").Service;

class DbService extends Service {
  //查询多条数据
  async select(table, obj = {}) {
    let { app } = this;
    try {
      let result = await app.mysql.select(table, obj);
      if (result.length > 0) return result;
      return [];
    } catch (e) { return []; }

  }
  //添加一条数据
  async add(table, data) {
    let { app } = this;
    try {
      let result = await app.mysql.insert(table, data);
      if (result.affectedRows === 1) return { insertId: result.insertId };
      return false;
    } catch (e) { return false }

  }
  //读取一条数据
  async get(table, data) {
    let { app } = this;
    try {
      let result = await app.mysql.get(table, data);
      if (result) return result;
      return false;
    } catch (e) { return false }

  }
  //删除一条数据
  async deleteSingle(table, data) {
    let { app } = this;
    try {
      let result = await app.mysql.delete(table, data);
      if (result.affectedRows === 1) return true;
      return false;
    } catch (e) { return false }

  }
  //更新一条数据
  async update(table, data, opts = {}) {
    let { app } = this;
    try {

      let result = await app.mysql.update(table, data, opts);
      if (result.affectedRows === 1) return true;
      return false;
    } catch (e) { return false }
  }
	async count(table){
		let { app } = this;
		console.log(2);
		let result = await app.mysql.query('SELECT COUNT(*) FROM '+table+';');
		let str = "COUNT(*)";
		result = result[0][str];
		return result;
	}
}

module.exports = DbService;