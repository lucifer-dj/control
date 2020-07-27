'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('/home/index.html')
  }
  async control() {
    const { ctx } = this;
    await ctx.render('/control/index.html')
  }
}

module.exports = HomeController;
