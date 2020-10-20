"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, app, service } = this;
    let data = ctx.request.body;
    let _info = await service.login.validUser(data);
    if (_info) {
      //生辰token
      const token = app.jwt.sign({
          account: data.account,
          pass: data.pass
        },
        app.config.jwt.secret, {
          expiresIn: 60 * 60
        }
      );
      ctx.set({ authorization: token });
      _info.token = token;
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "登陆成功",
        data: _info,
      };
    } else {
      ctx.err("登陆失败", 222);
    }
  }
  async getUserInfo(){
    let { ctx, service, app } = this;
    let token = ctx.request.header.authorization.split(' ')[1];
    let info = app.jwt.decode(token, app.config.jwt.secret);
    let result = await service.login.getUser(info.account);
    if(result) return ctx.success("自动登陆成功", {
      account: result.account,
      auth: result.auth
    });
    ctx.err("自动登陆失败", 500);
  }
}

module.exports = LoginController;