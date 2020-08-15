const Controller = require("egg").Controller;
// const path = require("path");
// const column = require('../../static/column.js');
class ColumnController extends Controller {
  constructor(ctx, service, config) {
    super(ctx, service, config);
  }
  async index() {
    let that = this;
    let { ctx, service, config } = that;
    let params = ctx.params.column;
    console.log(params);
    ctx.success("llll");
  }
}

module.exports = ColumnController;
