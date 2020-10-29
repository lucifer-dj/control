const Controller = require("egg").Controller;
class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    let { ctx, service } = this;
    let res = await service.frame.index.index();
    // console.log(res)
    await ctx.render("frame/index/index", res);
  }
}

module.exports = IndexController;