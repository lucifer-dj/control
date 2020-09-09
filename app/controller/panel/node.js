"use strict";

const Controller = require("egg").Controller;

class NodeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.table = 'node';
  }
  async getRouter() {
    let { ctx, service, table } = this;
    let req = ctx.request.body;
    let result = await service.db.queryAll(table);
    if (result.length > 0) {
      result = this.mergeRouter(result);
      ctx.success("查询成功", result);
    } else {
      ctx.err("没有查询到数据"); //表里没有数据
    }
  }
  mergeRouter(routes) {
    if (routes.length < 2) return routes;

    let deep = [];
    for (let i = 0; i < routes.length; i++) {
      deep.push(routes[i].deep);
    };
    deep = [...new Set(deep)].sort((a, b) => a - b);
    deep.shift();
    deep.shift();
    let layout = [];
    let temp = [];
    routes.forEach(route => {
      if (route.cid === 0) layout.push(route);
      else temp.push(route);
    })
    routes = temp;
    let obj = {};
    for (let i = 0; i < deep.length; i++) {
      obj[deep[i]] = routes.filter(r => r.deep === deep[i]);
    }
    routes.forEach(route => {
      deep.forEach(item => {
        let r = obj[item];
        for (let i = 0; i < r.length; i++) {
          if (route.id === r[i].cid) {
            if (!("children" in route)) {
              route.children = [];
            }
            route.children.push(r[i]);
          }
        }
      })
    })
    routes = routes.filter(r => r.cid === 1);
    layout[0].children = routes;
    layout = this.disposeRouter(layout)
    return layout;
  }
  disposeRouter(routes) {
    let arr = [];
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i]
      let obj = {
        path: route.v_path,
        component: route.component,
        meta: {
          title: route.title,
          auth: route.auth,
        },
        name: route.name
      }
      if (route.children) {
        obj.children = this.disposeRouter(route.children);
      }
      arr.push(obj)
    };
    return arr;
  }
}

module.exports = NodeController;