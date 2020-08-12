'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('control/panel') 
  }
  async postTest() {
    const { ctx } = this;
    ctx.body = {
    	msg:'测试'
    }
  }
  async getTest() {
    const { ctx } = this;
    ctx.body = "<h1>hello world!</h1>"
  }
}

module.exports = HomeController;
