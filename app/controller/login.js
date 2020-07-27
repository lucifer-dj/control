'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, app } = this;

    let data = ctx.request.body
    let sql = 'select pass from user where account=?'
    let result = await app.mysql.query(sql, 'admin')
    console.log(data)
    if (result[0].pass === data.pass) {
      //生辰token
      const token = app.jwt.sign({
        'account': data.account
      }, app.config.jwt.secret)
      console.log(token)
      ctx.status = 200,
        ctx.body = {
          code: 200,
          msg: '登陆成功',
          token
        }
    }

  }

}

module.exports = LoginController;
