"use strict";
const Service = require("egg").Service;

class NodeService extends Service {
	async getMenu(auth) {
		let {
			app
		} = this;
		let obj = {};
		if (auth == 'user') {
			obj = {
				where: {
					auth: 'user'
				}
			}
		}
		let menu = await app.mysql.select("node", obj);
		let deepArr = [];
		menu.forEach(i => deepArr.push(i.deep));
		let maxDeep = Math.max.apply(null, deepArr);
		this.disposeMenu(menu, maxDeep);
		menu = menu.filter(m => m.deep == 1);
		return menu
	}
	disposeMenu(menu, deep) {
		if (deep < 2) return;//只处理深度为1以上的
		let tempMenu = {};
		for (let i = 0; i < menu.length; i++) {
			if (menu[i].deep == deep) {
				tempMenu = menu.find(m => m.id == menu[i].cid);
				if (!("children" in tempMenu)) tempMenu.children = [];
				tempMenu.children.push(menu[i]);
			}
		};
		deep--;
		this.disposeMenu(menu, deep);
  }
  async queryAll(){
		// 节点管理不应该能管理column 栏目管理的节点id
		let columnId = 1;
		let {service} = this;
    let result = await service.db.select("node");
		result = result.filter(n => n.cid !== columnId);
    return result;
  }
}

module.exports = NodeService;
