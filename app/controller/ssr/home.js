"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, config } = this;
    // await ctx.render("control/panel");
    ctx.redirect(config.webPath);
    // ctx.body = "<h1>hello world!</h1>"
  }
  async postTest() {
    const { ctx, app } = this;
    let req = ctx.request.body;
    ctx.body = {
      msg: "测试",
    };
  }
  async getTest() {
    const { ctx, app, config } = this;
    ctx.body = `<h1>hello world!+${config.site}</h1>`;
  }
}

module.exports = HomeController;