const Controller  = require('egg').Controller;

class IndexController extends Controller{
	constructor(ctx){
		super(ctx);
	}
	async index(){
		let { ctx, service, config } = this;
		let header = await service.frame.index.header();
		let site = await service.site.read();
		let frame = {
			static: config.staticPath,
			header,
			page:site.data,
			index: true
		}
		await ctx.render('frame/index/index',frame)
	}
}

module.exports = IndexController;