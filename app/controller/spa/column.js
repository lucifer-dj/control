"use strict";
const path = require("path");
const Controller = require("egg").Controller;

class ColumnController extends Controller {
	constructor(ctx) {
		super(ctx);
		this.table = "column";
	}
	async queryAll() {
		let { ctx, service } = this;
		// let params = ctx.request.body;
		let result = await service.spa.column.queryAll();
		if (result) return ctx.success("查询成功", result);
		ctx.err("没有取到数据");
	}
	async add() {
		let { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.spa.column.add(params);
		if (result) return ctx.success("成功添加一条数据");
		ctx.err("添加栏目失败");
	}
	async read() {
		let { ctx, service, table } = this;
		let params = ctx.request.body;
		let result = await service.spa.db.get(table, params);
		if (result) {
			ctx.success("成功查询到一条数据", result);
		} else {
			ctx.err("添加失败");
		}
	}

	async update() {
		let { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.spa.column.update(params);
		if (result) {
			ctx.success("成功更新一条数据", result);
		} else {
			ctx.err("添加失败");
		}
	}

	async delete() {
		let { ctx, service } = this;
		let params = ctx.request.body;
		let result = await service.spa.column.delete(params);
		if (result) return ctx.success("删除成功");
		ctx.err("添加失败");
	}
	async columnCount() {
		let { ctx, service } = this;
		// let params = ctx.request.body;
		let result = await service.spa.column.getAllColumnCount();
		ctx.success("查询成功", result);
  }
  async getHtmlList() {
    let that = this;
    let { ctx, service } = that;
    // let req = ctx.request.body;
    let src = path.resolve(__dirname, "../../view/frame/list/");
    let files = await service.spa.column.getHtmlList(src);
    if (files) return ctx.success("查询成功", files);
    ctx.err("查询失败");
	}
}

module.exports = ColumnController;
