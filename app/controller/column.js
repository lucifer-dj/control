'use strict';

const Controller = require('egg').Controller;

class ColumnController extends Controller {
	async index() {
		let { ctx, service } = this;
		let result = await service.column.queryAll();
		if (result.length > 0) {
			ctx.success('查询成功',result)
		} else {
			ctx.error('查询失败')
		}
	}

	async add() {
		let { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.column.add(req)
		if (result) {
			ctx.success('成功添加一条数据',result)
		} else {
			ctx.error('添加失败')
		}
	}
	async read() {
		let { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.column.read(req);
		if (result) {
			ctx.success('成功查询到一条数据',result)
		} else {
			ctx.error('添加失败')
		}
	}

	async update(data) {
		let { ctx, service } = this;
		let req = ctx.request.body
		let result = await service.column.update(req)
		if (result) {
			ctx.success('成功更新一条数据',result)
		} else {
			ctx.error('添加失败')
		}	
	}

	async delete() {
		let { ctx, service } = this;
		let req = ctx.request.body;
		let result = await service.column.delete(req)
		if (result) {
			ctx.success('删除成功',result)
		} else {
			ctx.error('添加失败')
		}
	}
}

module.exports = ColumnController;