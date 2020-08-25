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
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
    };
    Object.assign(frame, indexObj);
    await ctx.render("frame/index/index", frame);
  }
}

module.exports = IndexController;
