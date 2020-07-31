'use strict';

const Controller = require('egg').Controller;

class ColumnController extends Controller {
	async index() {
		const {
			ctx,
			service
		} = this;
		let result = await service.column.query(0);
		if (result.length > 0) {
			ctx.status = 200;
			ctx.body = {
				code: 200,
				msg: '查询成功',
				data: result
			}
		} else {
			ctx.status = 200;
			ctx.body = {
				code: 1001,
				msg: '查询失败'
			}
		}

	}

	async add() {
		let {
			ctx,
			service
		} = this;
		let req = ctx.request.body;
		let result = await service.column.add(req)
		if (result) {
			ctx.status = 200;
			ctx.body = {
				code: 200,
				msg: '成功添加一条数据',
				data: result
			}
		} else {
			ctx.status = 200;
			ctx.body = {
				code: 1001,
				msg: '添加失败',
			}
		}
	}
	async read() {
		let {
			ctx,
			service
		} = this;
		let req = ctx.request.body;
		let result = await service.column.read(req);
		if (result) {
			ctx.status = 200;
			ctx.body = {
				code: 200,
				msg: '成功查询到一条数据',
				data: result
			}
		} else {
			ctx.status = 200;
			ctx.body = {
				code: 1001,
				msg: '查询失败',
			}
		}
	}

	async update(data) {
		let {
			ctx,
			service
		} = this;
		let req = ctx.request.body
		let result = await service.column.update(req)
		if (result) {
			ctx.status = 200
			ctx.body = {
				code: 200,
				msg: '成功更新一条数据',
			}
		} else {
			ctx.status = 200
			ctx.body = {
				code: 1001,
				msg: '更新失败'
			}
		}
	}

	async delete() {
		let {
			ctx,
			service
		} = this;
		let req = ctx.request.body;
		let result = await service.column.delete(req)
		if (result) {
			ctx.status = 200
			ctx.body = {
				code: 200,
				msg: '删除成功'
			}
		} else {
			ctx.status = 200
			ctx.body = {
				code: 1001,
				msg: '删除失败'
			}
		}
	}
}

module.exports = ColumnController;