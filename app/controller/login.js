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
      console.log(token)
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '登陆成功',
        token
      }
    }else{
     ctx.status = 200;
     ctx.body = {
      code: 1001,
      msg: '登录失败',
    }
  }

}
async auto(){
  const { ctx, app, service} = this;

  let token = ctx.request.header.authorization.split(' ')[1]
  try{
    let user = app.jwt.verify(token, app.config.jwt.secret)
    let result = await service.login.valid(user)
    if(result){
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '自动登陆成功',
      }
    }else{
      ctx.status = 401;
      ctx.body = {
        code: 1002,
        msg: '自动登录失败',
      }
    }
  }catch(e){
   ctx.status = 401;
   ctx.body = {
    code: 1002,
    msg: '自动登录失败',
  }
}
}

}

module.exports = LoginController;
