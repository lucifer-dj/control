"use strict";
const Service = require("egg").Service;

class NodeService extends Service {
	async getRouter() {
		let { service } = this;
		let routes = await service.spa.db.select("node");
		if (!(routes.length > 1)) return false;
		console.log(routes);
		routes = this.disposeRouter(routes);
		return routes;
	}
	async queryAll() {
		let { app } = this;
		let db = await app.mysql.get("spa");
		let sql =
			"SELECT * FROM `node` AS n WHERE n.component_name != 'column' AND  n.component_name != 'index' AND n.deep != 0;";
		let nodes = await db.query(sql);
		if (!(nodes.length > 1)) return false;
		return nodes;
	}
	async getMenu({ auth }) {
		let { app } = this;
		let db = await app.mysql.get("spa");
		let sql =
			"SELECT * FROM `node` AS n WHERE n.component_name != 'index' AND n.auth = 'user';";
		if (auth == "root")
			sql =
				"SELECT * FROM `node` AS n WHERE n.component_name != 'index';";
		let nodes = await db.query(sql);
		if (!(nodes.length > 1)) return false;
		nodes = this.disposeMenu(nodes);
		return nodes;
	}
	disposeMenu(menus) {
		let deeps = [];
		menus.forEach((m) => deeps.push(m.deep));
		deeps = [...new Set(deeps)].sort((a, b) => a - b);
		deeps.shift();
		let translator = (menus, deeps) => {
			let lastdeep = deeps.pop();
			menus.forEach((item) => {
				if (item.deep === lastdeep) {
					let target = menus.find((m) => item.pid === m.id);
					if ("children" in target) {
						target.children.push(item);
					} else {
						target.children = [];
						target.children.push(item);
					}
				}
			});
			// menus = menus.filter((m) => m.deep != lastdeep);
			if (deeps.length != 0) translator(menus, deeps);
		};
		translator(menus, deeps);
		menus = menus.filter((m) => m.deep == 1);
		return menus;
	}

	disposeRouter(routes) {
    // 去重
		let res = [];
		let map = new Map();
		routes.forEach((item) => {
			if (map.has(item.component_name)) return;
			map.set(item.component_name, true);
			res.push(item);
		});
		routes = res;
		routes = routes.map((item) => {
			return {
				name: item.component_name,
				path: item.component_path,
				component: item.component,
				meta: {
					title: item.title,
					auth: item.auth,
					call: item.call,
					icon: item.icon,
					cid: item.cid,
				},
			};
		});
		// console.log(routes)
    let Layout = routes.filter((r) => r.name === "Layout");
		let children = routes.filter((r) => r.name !== "Layout");
    Layout[0].children = children;
    delete Layout[0].name; // 有默认路由的时候父组件不需要名字
		return Layout;
	}
	async getTps() {
		let { service } = this;
		let tps = await service.spa.db.select("tmp");
		tps = tps.length > 0 ? tps : [];
		for (var i = 0; i < tps.length; i++) {
			tps[i] = {
				...tps[i],
				icon: "",
				cid: "",
				auth: "user",
				title: tps[i].call,
			};
		}
		return tps;
	}
}

module.exports = NodeService;
