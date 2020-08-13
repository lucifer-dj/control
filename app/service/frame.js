let Service = require('egg').Service;

class FrameService extends Service {
	async columns(){
		let { app, service, config } = this;
		let result = await service.db.queryAll('column');
		let arr = [];
		let obj = {};
		result.forEach((item,idx)=>{
			item.link = config.site+'/'+item.link;
			arr.push(item);
			obj[item.template] = item;
		});
		for(let item in obj){
			let table = obj[item].template.toLocaleLowerCase().substr(2);
			obj[item].array = await service.db.queryAll(table,{limit:8});
		}
		return {
			arr,obj
		}
	}
}

module.exports = FrameService;