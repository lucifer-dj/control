const Controller = require('egg').Controller;
const path = require("path");
// const column = require('../../static/column.js');
class IndexController extends Controller {
  constructor(ctx, service, config) {
    super(ctx, service, config);
    this.sitePath = path.resolve(__dirname, "../../static/site.config.json");
  }
  async index() {
    let { ctx, service, config } = this;
    let site = await service.file.read(this.sitePath);
    let frame = {
      static: config.publicPath,
      columns: column,
      page: site.data,
      index: true,
      test: new Date().valueOf(),
      tempArr: new Array(4).fill(1),
    }
    await ctx.render('frame/index/index', frame)
  }
}

module.exports = IndexController;