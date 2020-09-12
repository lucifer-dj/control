"use strict";
const Service = require("egg").Service;

class DbService extends Service {
  //查询多条数据
  async select(table, obj = {}) {
    let { app } = this;
    let result = await app.mysql.select(table, obj);
    if (result.length > 0) return result;
    return [];
  }
  //添加一条数据
  async add(table, data) {
    let { app } = this;
    let result = await app.mysql.insert(table, data);
    if (result.affectedRows === 1) return { insertId: result.insertId };
    return false;
  }
  //读取一条数据
  async readSingle(table, data) {
    let { app } = this;
    let result = await app.mysql.get(table, data);
    if (result) return result;
    return false;
  }
  //删除一条数据
  async deleteSingle(table, data) {
    let { app } = this;
    let result = await app.mysql.delete(table, data);
    if (result.affectedRows === 1) return true;
    return false;
  }
  //更新一条数据
  async update(table, data, opts = {}) {
    let { app } = this;
    let result = await app.mysql.update(table, data, opts);
    if (result.affectedRows === 1) return true;
    return false;
  }
}

module.exports = DbService;
