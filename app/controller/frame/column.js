const Controller = require("egg").Controller;

class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.tempData = {
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
      static: "public/frame",
    };
  }
  /**
   * 这里是每个会拿到list目录下的所有文件
   */
  async index() {
    let that = this;
    let { ctx, service } = that;
    let params = ctx.params.column;
    let query = ctx.query;
    let res = await service.frame.checkLink(params, query);
    if (!res) return (ctx.body = "<h1>没有找到当前页面</h1>");
    await that[res.tmp](res);
  }
  /**
   * 检查当前路由对应的模板是否存在
   */
  async role(params) {
    let that = this;
    let { ctx, service, config } = that;
    let data = await service.frame.role();
    let tempData = {
      static: config.publicPath,
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
    };
    Object.assign(data, tempData);
    await ctx.render("frame/list/role", data);
  }
  async faction(params) {
    let that = this;
    let { ctx, service, config } = that;
    let data = await service.frame.faction();
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
    let data = await service.frame.realm();
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
  async contact() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/contact", that.tempData);
  }
  async faction2() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/faction2", that.tempData);
  }
  async product() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/product", that.tempData);
  }
  async scope() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/scope", that.tempData);
  }
  async video() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/video", that.tempData);
  }
  async page() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/page", that.tempData);
  }
}

module.exports = IndexController;
