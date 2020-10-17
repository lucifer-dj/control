// 角色管理
"use strict";
const Controller = require("egg").Controller;

class CaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.table = "role";
  }
  async queryAll() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.select(table, req);
    if (result) {
      ctx.success("成功", result);
    } else {
      ctx.err("失败或者没查到数据", 311);
    }
  }
  async add() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.add(table, req);
    if (result) ctx.success("成功添加一位角色");
    else ctx.err("添加角色失败");
  }
  async read() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.get(table, req);
    if (result) ctx.success("查询成功", result);
    else ctx.err("查询失败");
  }
  async delete() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.deleteSingle(table, req);
    if (result) ctx.success("成功删除一条数据");
    else ctx.err("删除失败");
  }
  async update() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.spa.db.update(table, req);
    if (result) ctx.success("成功更新一条数据");
    else ctx.err("更新失败");
  }
}

module.exports = CaseController;
