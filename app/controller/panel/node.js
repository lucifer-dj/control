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
    for (var i = 0; i < routes.length; i++) {
      deep.push(routes[i].deep);
    };
    deep = [...new Set(deep)].sort((a, b) => a - b);
    let layout = deep.shift();
    layout = routes.filter(r => r.cid === layout);
    routes = routes.filter(r => r.cid !== layout);
    let obj = {};
    for (var i = 0; i < deep.length; i++) {
      obj[i] = routes.filter(r => r.cid === deep[i]);
    }
    let un = deep.pop();
    console.log(un)
    while (un) {
      for (var i = 0; i < obj[un].length; i++) {
        let r = obj[un][i];
        routes.forEach(item => {
          if (item.id === r.cid) {
            if (!('children' in item)) {
              item.children = [];
            }
            item.children.push(r)
          }
        })
      }
    }
    routes = routes.filter(r => r.cid === 1);
    layout.children = routes;
    let temp = [];
    temp.push(layout);
    layout = this.disposeRouter(temp)
    return layout;
  }
  disposeRouter(routes) {
    let arr = [];
    for (var i = 0; i < routes.length; i++) {
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