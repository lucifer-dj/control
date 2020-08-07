const Controller = require('egg').Controller;

class PageController extends Controller{
	async read(){
		let { ctx,service } = this;
		let req = ctx.request.body
		let result = await service.panel.page.read(req)
		if(result) return ctx.success('成功查询到一条数据',result)
		ctx.success('未查询到数据')
	}
	async add(){
		let { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.panel.page.add(req);
		if(result) return ctx.success('添加成功')
			ctx.err('添加单页失败')
	}
}

	module.exports = PageController;