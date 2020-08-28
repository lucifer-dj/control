const Controller = require("egg").Controller;
let path = require("path");
class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    let that = this;
    let { ctx, service, config } = that;
    let columns = await service.db.queryAll("column");
    let params = ctx.params.column;
    let src = path.resolve(__dirname, "../../view/frame/list/")
    let files = await service.file.readFiles(src);
    // console.log(files);
    let isLink = files.indexOf(params);
    // let isLink = columns.some((item) => ctx.url.startsWith("/" + item.link));
    if (isLink == -1) return (ctx.body = "<h1>没有找到当前页面</h1>");

    // let arr = fs.readdirSync(path.resolve(__dirname,'../../view/frame/list/'))
    // console.log(arr)
    // let p = columns.find((ele) => ele.link === params); //如果有子栏目需要修改成递归
    await that[params](params);
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
    await ctx.render("frame/list/about");
  }
  async contact() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/contact");
  }
  async faction2() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/faction2");
  }
  async product() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/product");
  }
  async scope() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/scope");
  }
  async video() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/video");
  }
  async page() {
    let that = this;
    let { ctx } = that;
    await ctx.render("frame/list/page");
  }
}

module.exports = IndexController;