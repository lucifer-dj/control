

const Controller = require('egg').Controller;

class CaseController extends Controller {
	async index() {
		const { ctx, service } = this;
		let req = ctx.request.body
		let result = await service.panel.case.queryAll(req.num);
		if(result){
			ctx.success('成功',result)
		}else{
			ctx.err('失败或者没查到数据')
		}
	}
	async add() {
		const { ctx, service } = this;
		let req = ctx.request.body
		let result = await service.panel.case.add(req)
		if(result)  ctx.success('成功添加一位角色')
			else	ctx.err('添加角色失败')
		}
	async read() {
		const { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.panel.case.read(req)
		if(result) ctx.success('查询成功',result)
			else ctx.err('查询失败')
		}
	async delete() {
		const { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.panel.case.delete(req)
		if(result) ctx.success('成功删除一条数据')
			else ctx.err('删除失败')
		}
	async update() {
		const { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.panel.case.update(req)
		if(result) ctx.success('成功更新一条数据')
			else ctx.err('更新失败')
		}
}

module.exports = CaseController;
