"use strict";
const Service = require("egg").Service;

class PageService extends Service {
  //通过nid拿到对应的column然后拿到page
  async getAllColumnCount() {
    let { service } = this;
    let role = await service.db.count('role');
    let page = await service.db.count('page');
    let faction = await service.db.count('faction');
    let realm = await service.db.count('realm');
    let year = await service.db.count('year');
    return [{ name: '角色', num: role  }, { name: '单页', num: page  }, { name: '地域', num: faction }, { name: '境界', num: realm }, { name: '时间线', num: year }, ];
  }
	async queryAll(){
		let { app } = this;
    let sql = 'SELECT c.*, n.deep, n.path,n.cid FROM `column` AS c LEFT OUTER JOIN node  AS n ON c.nid = n.id;';
		let result = await app.mysql.query(sql);
		return result;
	}
	async add(params){
		let { app } = this;
		const conn = await app.mysql.beginTransaction();
		console.log(params);
		try{
			let nodeResult = await conn.insert('node', params.node);
			params.column.nid = nodeResult.insertId;
			await conn.insert('column', params.column);
			await conn.commit();
			return true;
		}catch(e){
			console.log(e);
			await conn.rollback();
			return false;
		}
  }
  async update(params){
		let { app } = this;
		const conn = await app.mysql.beginTransaction();
		 console.log(params);
		try{
			await conn.update('node', params.node);
			await conn.update('column', params.column);
			await conn.commit();
			return true;
		}catch(e){
			console.log(e);
			await conn.rollback();
			return false;
		}
  }
  async delete(params){
    let { app } = this;
		const conn = await app.mysql.beginTransaction();
		try{
			await conn.delete('node', {id: params.node});
			await conn.delete('column', {id: params.column});
			await conn.commit();
			return true;
		}catch(e){
			console.log(e);
			await conn.rollback();
			return false;
		}
  }
}
module.exports = PageService;