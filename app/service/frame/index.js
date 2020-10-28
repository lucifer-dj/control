"use strict";
let path = require("path");
let Service = require("egg").Service;

class IndexService extends Service {
	async index() {
		let that = this;
		let { app } = that;
		let db = app.mysql.get("spa");
		let roles = await db.select("role", { limit: 4 });
		let factions = await db.select("faction", { limit: 4 });
		let years = await db.select("year", { limit: 4 });
		let banners = await db.select("banner", { limit: 4 });
		let realms = await db.select("realm", { limit: 4 });
		let about = await db.get("page", {
			pid: 4,
		});
		let res = await that.shareData();
		return {
			roles,
			factions,
			years,
			banners,
			realms,
			about,
			...res,
			head_active: 0,
		};
	}
	/**
	 * 检查通过id获取到的栏目然后通过栏目获取到的模板存不存在
	 */
	async checkLink(params, query) {
		let { app } = this;
		let db = app.mysql.get("spa");
		let columns = await db.select("column");
		let _target = columns.find((c) => Number(c.id) === Number(query.id));
		if (!_target || params !== _target.link) return false;
		_target.html_template = _target.html_template.split(".")[0];
		return _target;
	}
	//共享的数据
	async shareData() {
		let that = this;
		let { app, service } = that;
		let db = app.mysql.get("spa");
		let site = await service.frame.file.read("site.config.json");
		let columnsModel = await db.select("column");
		let columns = {};
		columnsModel.forEach((item, idx) => {
			columns[item.ename] = item;
		});
		return {
			headers: columnsModel,
			test: new Date().valueOf(),
			tempArr: new Array(4).fill(1),
			static: "/public/frame",
			site,
			columns,
		};
	}
	async role() {
		let that = this;
		let { app } = that;
		let db = app.mysql.get("spa");
		let roles = await db.select("role", {
			limit: 10,
		});
		let res = await that.shareData();
		return {
			roles,
			...res,
		};
	}
	async faction() {
		let that = this;
		let { app } = that;
		let db = app.mysql.get("spa");
		let factions = await db.select("faction", {
			limit: 10,
		});
		let res = await that.shareData();
		return {
			factions,
			...res,
		};
	}
	async realm() {
		let that = this;
		let { app } = that;
		let db = app.mysql.get("spa");
		let realms = await db.select("realm", {
			limit: 10,
		});
		let res = await that.shareData();
		return {
			realms,
			...res,
		};
	}
	async page(id) {
		let that = this;
		let { app } = that;
		let db = app.mysql.get("spa");
		let page = await db.get("page", { pid: id });
		let res = await that.shareMsg();
		return {
			page,
			...res,
		};
	}
}

module.exports = IndexService;
