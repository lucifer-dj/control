"use strict";

const Controller = require("egg").Controller;

class NodeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.table = 'node';
  }
  async getRouter() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.node.router();
    if (result) return ctx.success('查询成功', result)
    return ctx.err('没有取到数据')
  }

  async queryAll() {
    let { ctx, service } = this;
    let result = await service.db.queryAll(this.table);
    if (result) return ctx.success('查询成功', result)
    return ctx.err('没有取到数据')
  }
  async read() {
    let { ctx } = this;
    console.log(9)
    ctx.success('lllll')
  }
  async delete() {
    let { ctx } = this;
    console.log(9)
    ctx.success('lllll')
  }
  async update() {
    let { ctx } = this;
    console.log(9)
    ctx.success('lllll')
  }
  async add() {
    let { ctx } = this;
    console.log(9)
    ctx.success('lllll')
  }
}

module.exports = NodeController;