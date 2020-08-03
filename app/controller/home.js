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
  async getMenu(){
    const { ctx, service } = this;
    let result = await service.column.queryAll();
    console.log(result)
    ctx.success('查询成功')
  }

}

module.exports = HomeController;
