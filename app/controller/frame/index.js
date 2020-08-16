const Controller = require("egg").Controller;
class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    let { ctx, service, config } = this;
    let indexObj = await service.frame.index();
    let frame = {
      static: config.publicPath,
      index: true,
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
    };
    Object.assign(frame, indexObj);
    await ctx.render("frame/index/index", frame);
  }
  async column() {
    let that = this;
    let { ctx, service, config } = that;
    let columns = await service.db.queryAll("column");
    console.log(ctx.url);
    let isLink = columns.some((item) => ctx.url.startsWith("/" + item.link));
    if (!isLink) return (ctx.body = "<h1>没有找到当前页面</h1>");
    let params = ctx.params.column;
    that.role();
  }
  async role() {
    let that = this;
    let { ctx } = that;
    ctx.body = ctx;
  }
  async faction() {
    let that = this;
    let { ctx } = that;
    ctx.body = ctx;
  }
  async realm() {
    let that = this;
    let { ctx } = that;
    ctx.body = ctx;
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
