const Controller = require("egg").Controller;
class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    let that = this;
    let { ctx, service, config } = that;
    return (ctx.body = "<h1>单页正在处理</h1>");
    let columns = await service.db.queryAll("column");
    console.log(ctx.url);
    let isLink = columns.some((item) => ctx.url.startsWith("/" + item.link));
    if (!isLink) return (ctx.body = "<h1>没有找到当前页面</h1>");
    let params = ctx.params.column;
    console.log(ctx.params);
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
