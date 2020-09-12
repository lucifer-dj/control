"use strict";
const Controller = require("egg").Controller;

class BannerController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.table = "banner";
  }
  async queryAll() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.select(table);
    if (result) {
      ctx.success("成功", result);
    } else {
      ctx.err("失败或者没查到数据");
    }
  }
  async add() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.add(table, req);
    if (result) ctx.success("成功添加一个benner");
    else ctx.err("添加banner失败");
  }
  async read() {
    const { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.readSingle(table, req);
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
}

module.exports = BannerController;
