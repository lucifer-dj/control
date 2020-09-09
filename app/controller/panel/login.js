"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, app, service } = this;

    let data = ctx.request.body;
    let result = await service.login.valid(data);
    if (result) {
      //生辰token
      const token = app.jwt.sign({
          account: data.account,
          pass: data.pass,
        },
        app.config.jwt.secret
      );
      ctx.set({ authorization: token });
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: "登陆成功",
        token,
      };
    } else {
      ctx.err("登陆失败", 401);
    }
  }
  async auto() {
    const { ctx } = this;
    ctx.success("自动登陆成功", );
  }
  async getRouter() {
    const { ctx } = this;
    ctx.success('ok', [{
        "path": "",
        "component": "Layout",
        "redirect": "dashboard",
        "children": [{
          "path": "dashboard",
          "component": "dashboard/index",
          "meta": {
            "title": "首页",
            "icon": "dashboard"
          }
        }]
      },
      {
        "path": "/example",
        "component": "Layout",
        "redirect": "/example/table",
        "name": "Example",
        "meta": {
          "title": "案例",
          "icon": "example"
        },
        "children": [{
            "path": "table",
            "name": "Table",
            "component": "table/index",
            "meta": {
              "title": "表格",
              "icon": "table"
            }
          },
          {
            "path": "tree",
            "name": "Tree",
            "component": "tree/index",
            "meta": {
              "title": "树形菜单",
              "icon": "tree"
            }
          }
        ]
      },
      {
        "path": "/form",
        "component": "Layout",
        "children": [{
          "path": "index",
          "name": "Form",
          "component": "form/index",
          "meta": {
            "title": "表单",
            "icon": "form"
          }
        }]
      },
      {
        "path": "*",
        "redirect": "/404",
        "hidden": true
      }
    ])
  }
}

module.exports = LoginController;