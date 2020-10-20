"use strict";
const Controller = require("egg").Controller;

class NodeController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.table = "node";
	}
	async getRouter() {
		let { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.spa.node.getRouter(params);
		if (result) return ctx.success("查询成功", result);
		ctx.err("暂时还没有数据");
	}
	async getMenu() {
		let { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.spa.node.getMenu(params);
		if (result) return ctx.success("查询成功", result);
		ctx.err("暂时还没有数据");
	}
	async queryAll() {
		let { ctx, service } = this;
		let result = await service.spa.node.queryAll();
		if (result) return ctx.success("查询成功", result);
		ctx.err("暂时还没有数据");
	}
	async read() {
		const { ctx, service, table } = this;
		let req = ctx.request.body;
		let result = await service.spa.db.get(table, req);
		if (result) return ctx.success("查询成功", result);
		ctx.err("暂时还没有数据");
	}
	async delete() {
		const { ctx, service, table } = this;
		let req = ctx.request.body;
		let result = await service.spa.db.deleteSingle(table, req);
		if (result) return ctx.success("成功删除一个节点");
		ctx.err("更新节点失败");
	}
	async update() {
		const { ctx, service, table } = this;
		let req = ctx.request.body;
		let result = await service.spa.db.update(table, req);
		if (result) return ctx.success("成功更新一个节点");
		ctx.err("更新节点失败");
	}
	async add() {
		const { ctx, service, table } = this;
		let req = ctx.request.body;
		let result = await service.spa.db.add(table, req);
		if (result) return ctx.success("成功添加一个节点", result);
		ctx.err("添加节点失败");
	}
}

module.exports = NodeController;
