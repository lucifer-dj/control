'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, app, service } = this;

    let data = ctx.request.body
    let result = await service.login.valid(data)
    if (result) {
      //生辰token
      const token = app.jwt.sign({
       account: data.account,
       pass: data.pass 
     }, app.config.jwt.secret)
      ctx.set({'authorization':token})
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '登陆成功',
        token
      }
    }else{
      ctx.error('登陆失败',401)
    }

  }
  async auto(){
    const { ctx } = this;
    ctx.success('自动登陆成功');
  }

}

module.exports = LoginController;
