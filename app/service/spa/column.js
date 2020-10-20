"use strict";
const fs = require("fs");
const Service = require("egg").Service;

class PageService extends Service {
	//通过nid拿到对应的column然后拿到page
	async getAllColumnCount() {
		let { service } = this;
		let role = await service.spa.db.select("role");
		let page = await service.spa.db.select("page");
		let faction = await service.spa.db.select("faction");
		let realm = await service.spa.db.select("realm");
		let year = await service.spa.db.select("year");
		return [
			{ name: "角色", num: role.length },
			{ name: "单页", num: page.length },
			{ name: "地域", num: faction.length },
			{ name: "境界", num: realm.length },
			{ name: "时间线", num: year.length },
		];
	}
	async queryAll() {
		let { app } = this;
		let sql =
			"SELECT c.*, n.deep FROM `column` AS c LEFT OUTER JOIN node  AS n ON c.nid = n.id";
		let result = await app.mysql.get("spa").query(sql);
		if (result) return result;
		return false;
	}
	async add({ node, column }) {
		let { app } = this;
		const conn = await app.mysql.get("spa").beginTransaction();
		try {
			let { insertId } = await conn.insert("node", node);
			column.nid = insertId;
			await conn.insert("column", column);
			await conn.commit();
			return true;
		} catch (e) {
			await conn.rollback();
			console.log(e);
			return false;
		}
	}
	async update({ node, column }) {
		let { app } = this;
		const conn = await app.mysql.get("spa").beginTransaction();
		try {
			await conn.update("column", column);
			node.id = column.nid;
			await conn.update("node", node);
			await conn.commit();
			return true;
		} catch (e) {
			await conn.rollback();
			console.log(e);
			return false;
		}
	}
	async delete({ id, nid }) {
		let { app } = this;
		const conn = await app.mysql.get("spa").beginTransaction();
		try {
			await conn.delete("column", { id });
			await conn.delete("node", { id: nid });
			await conn.commit();
			return true;
		} catch (e) {
			await conn.rollback();
			console.log(e);
			return false;
		}
	}

	async getHtmlList(src) {
		return new Promise((resolve, reject) => {
			fs.readdir(src, "utf8", function (err, files) {
				if (err) return reject(err);
				resolve(files);
			});
		});
	}
}
module.exports = PageService;
