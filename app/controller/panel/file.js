"use strict";
const Controller = require("egg").Controller;
const path = require("path");
class SiteController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.sitePath = "site.config.json";
  }
  async readSite() {
    let that = this;
    let { ctx, service } = that;
    let result = await service.file.read(that.sitePath);
    if (!result)
      return ctx.err("读取失败");
    ctx.success("读取成功", result);
  }
  async updateSite() {
    let that = this;
    let { ctx, service } = that;
    let req = ctx.request.body;
    let result = await service.file.update(that.sitePath, req);
    if (result) return ctx.success("修改成功");
    ctx.err("修改失败");
  }
  async getTps() {
    let that = this;
    let { ctx, service } = that;
    let req = ctx.request.body;
    let src = path.resolve(__dirname, "../../view/frame/list/");
    let files = await service.file.readFiles(src);
    if (files) return ctx.success("查询成功", files);
    ctx.err("修改失败");
  }
}

module.exports = SiteController;