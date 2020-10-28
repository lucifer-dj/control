"use strict";
let path = require("path");
let Service = require("egg").Service;

class FrameService extends Service {
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
		let res = await that.shareMsg();
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
	//共享的数据
	async shareMsg() {
		let that = this;
		let { app, service } = that;
		let db = app.mysql.get("spa");
		let site = await service.frame.file.read("site.config.json");
		let columnsModel =await db.select("column");
		let columns = {};
		columnsModel.forEach((item, idx) => {
			columns[item.ename] = item;
		});
		return {
			headers: columnsModel,
			test: new Date().valueOf(),
			tempArr: new Array(4).fill(1),
			static: "public/frame",
			site,
			columns,
		};
	}
	async role() {
		let that = this;
		let { service } = that;
		let roles = await service.db.select("role", {
			limit: 10,
		});
		let res = await that.shareMsg();
		return {
			roles,
			...res,
		};
	}
	/**
	 * 检查通过id获取到的栏目然后通过栏目获取到的模板存不存在
	 */
	async checkLink(params, query) {
		let { service } = this;
		let columns = await service.db.select("column");
		let tmps = await service.db.select("tmp");
		let _target = columns.find((c) => Number(c.id) === Number(query.id));
		if (!_target || params !== _target.link) return false;
		let _tmp = tmps.find((t) => Number(_target.template) === Number(t.id));
		if (_tmp)
			return {
				...query,
				tmp: _tmp.template.split(".")[0],
			};
		return false;
	}
	async faction() {
		let that = this;
		let { service } = that;
		let factions = await service.db.select("faction", {
			limit: 10,
		});
		let res = await that.shareMsg();
		return {
			factions,
			...res,
		};
	}
	async realm() {
		let that = this;
		let { service } = that;
		let realms = await service.db.select("realm", {
			limit: 10,
		});
		let res = await that.shareMsg();
		return {
			realms,
			...res,
		};
	}
	async page(id) {
		let that = this;
		let { service } = that;
		let page = await service.db.get("page", { pid: id });
		let res = await that.shareMsg();
		return {
			page,
			...res,
		};
	}
}

module.exports = FrameService;
