"use strict";

const Controller = require("egg").Controller;

class TmpController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.table = "tmp";
  }
  async queryAll() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.select(table, req);
    if (result) return ctx.success("查询成功", result);
    return ctx.err("没有取到数据");
  }

  async add() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.add(table, req);
    if (result) {
      ctx.success("成功添加一条数据", result);
    } else {
      ctx.err("添加失败");
    }
  }
  async read() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.get(table, req);
    if (result) {
      ctx.success("成功查询到一条数据", result);
    } else {
      ctx.err("添加失败");
    }
  }

  async update(data) {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.update(table, req);
    if (result) {
      ctx.success("成功更新一条数据", result);
    } else {
      ctx.err("添加失败");
    }
  }

  async delete() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.deleteSingle(table, req);
    if (result) {
      ctx.success("删除成功", result);
    } else {
      ctx.err("添加失败");
    }
  }
}

module.exports = TmpController;
