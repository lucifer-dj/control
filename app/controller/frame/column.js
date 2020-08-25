const Controller = require("egg").Controller;
class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    let that = this;
    let { ctx, service, config } = that;
    let columns = await service.db.queryAll("column");
    let isLink = columns.some((item) => ctx.url.startsWith("/" + item.link));
    if (!isLink) return (ctx.body = "<h1>没有找到当前页面</h1>");
    let params = ctx.params.column;

    let p = columns.find((ele) => ele.link === params); //如果有子栏目需要修改成递归
    await that[p.template](p);
  }
  async role(params) {
    let that = this;
    let { ctx, service, config } = that;
    let data = await service.frame.role(params.origin);
    let tempData = {
      static: config.publicPath,
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
      column: params,
    };
    Object.assign(data, tempData);
    await ctx.render("frame/list/role", data);
  }
  async faction(params) {
    let that = this;
    let { ctx, service, config } = that;
    let data = await service.frame.faction(params.origin);
    let tempData = {
      static: config.publicPath,
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
      column: params,
    };
    Object.assign(data, tempData);
    await ctx.render("frame/list/faction", data);
  }
  async realm(params) {
    let that = this;
    let { ctx, service, config } = that;
    let data = await service.frame.realm(params.origin);
    let tempData = {
      static: config.publicPath,
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
      column: params,
    };
    Object.assign(data, tempData);
    await ctx.render("frame/list/realm", data);
  }
  async year() {
    let that = this;
    let { ctx } = that;
    ctx.body = ctx;
  }
  async about() {
    let that = this;
    let { ctx } = that;
    ctx.body = ctx;
  }
}

module.exports = IndexController;
