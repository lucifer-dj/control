const Controller  = require('egg').Controller;

class IndexController extends Controller{
	constructor(ctx){
		super(ctx);
	}
	async index(){
		let { ctx, service, config } = this;
		let columns = await service.frame.columns();
		let site = await service.site.read();
		let frame = {
			static: config.staticPath,
			header: columns.arr,
			columns: columns.obj,
			page:site.data,
			index: true,
			test:new Date().valueOf(),
			tempArr: new Array(4).fill(1),
		}
		await ctx.render('frame/index/index',frame)
	}
}

module.exports = IndexController;