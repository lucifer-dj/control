"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, app, service } = this;
    let data = ctx.request.body;
    let _info = await service.login.valid(data);
    if (_info) {
      //生辰token
      const token = app.jwt.sign({
          account: data.account,
          pass: data.pass,
        },
        app.config.jwt.secret
      );
      ctx.set({ authorization: token });
      _info.token = token;
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "登陆成功",
        data: _info
      };
    } else {
      ctx.err("登陆失败", 401);
    }
  }
  async getInfo() {
    const { ctx, service, app } = this;
    let token = ctx.request.body.token;
    try {
      let info = app.jwt.verify(token, app.config.jwt.secret);
      let _info = await service.login.valid(info);
      _info.token = token;
      ctx.success("自动登录成功", _info)
    } catch (e) {
      console.log(e);
      ctx.err("验证token失败请重新登录", 500)
    }
  }
}

module.exports = LoginController;