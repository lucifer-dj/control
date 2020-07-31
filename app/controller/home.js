'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hello"
  }
   async t() {
    const { ctx } = this;
    ctx.body = {
    	msg:'测试'
    }
  }

}

module.exports = HomeController;
