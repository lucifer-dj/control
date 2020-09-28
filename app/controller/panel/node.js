"use strict";
const Controller = require("egg").Controller;

class NodeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.table = "node";
  }
  async getRouter() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.node.router(req);
    if (result) return ctx.success("查询成功", result);
    return ctx.err("没有取到数据");
  }
  async getMenu() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.node.menu(req);
    if (result) return ctx.success("查询成功", result);
    return ctx.err("没有取到数据");
  }
  async queryAll() {
    let { ctx, service } = this;
    let result = await service.node.getNodes();
    if (result) return ctx.success("查询成功", result);
    return ctx.err("没有取到数据");
  }
  async read() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.get(table, req);
    if (result) ctx.success("查询成功", result);
    else ctx.err("查询失败");
  }
  async delete() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.deleteSingle(table, req);
    if (result) ctx.success("成功删除一个banner");
    else ctx.err("删除失败");
  }
  async update() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.update(table, req);
    if (result) ctx.success("成功更新一个banner");
    else ctx.err("更新失败");
  }
  async add() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.add(table, req);
    if (!result) ctx.err("添加节点失败");
    else ctx.success("成功添加一个节点", result);
  }
}

module.exports = NodeController;