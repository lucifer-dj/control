

const Controller = require('egg').Controller;

class RoleController extends Controller {
	async index() {
		const { ctx, service } = this;
		let req = ctx.request.body
		console.log(req)
		let result = await service.role.queryAll(req.num);
		if(result){
			ctx.success('成功',result)
		}else{
			ctx.err('失败或者没查到数据')
		}

	}
	async add() {
		const { ctx, service } = this;
		let req = ctx.request.body
		let result = await service.role.add(req)
		if(result)  ctx.success('成功添加一位角色')
			else	ctx.err('添加角色失败')
		}
	async read() {
		const { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.role.read(req)
		if(result) ctx.success('查询成功',result)
			else ctx.err('查询失败')
		}
	async delete() {
		const { ctx, service } = this;
		ctx.success('成功',result)
	}
	async update() {
		const { ctx, service } = this;
		ctx.success('成功',result)
	}
}

module.exports = RoleController;
