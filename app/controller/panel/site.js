const Controller = require('egg').Controller;

class SiteController extends Controller{
	async read(){
		let { ctx, service } = this;
		let result = await service.site.read();
		if(result.state) return ctx.success('读取成功',result.data);
		ctx.err('读取失败')
	}
	async update(){
		let { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.site.update(req);
		if(result.state) return ctx.success('修改成功')
			ctx.err('修改失败')
	}
}

module.exports = SiteController;