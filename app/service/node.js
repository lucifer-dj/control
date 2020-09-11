"use strict";

const Service = require("egg").Service;

class NodeService extends Service {
  async router(auth) {
    let { app, service } = this;
    let routes = await service.db.select("node");
    if (auth.auth === "user") routes = routes.filter((r) => r.auth === "user");
    if (!(routes.length > 1)) return false;
    routes = await this.mergeRouter(routes);
    return routes;
  }
  async getNodes() {
    let { app, service } = this;
    let nodes = await service.db.select("node");
    if (!(nodes.length > 1)) return false;
    let column = nodes.find((r) => r.name === "column");
    nodes = nodes.filter((n) => n.deep !== 0);
    nodes = nodes.filter((n) => n.cid !== column.id);
    return nodes;
  }
  async menu() {
    let { app, service } = this;
    let nodes = await service.db.select("node");
    if (!(nodes.length > 1)) return false;
    nodes = this.mergeMenu(nodes);
    return nodes;
  }
  mergeMenu(routes) {
    if (routes.length < 2) return routes;
    let deep = [];
    for (let i = 0; i < routes.length; i++) {
      deep.push(routes[i].deep);
    }
    deep = [...new Set(deep)].sort((a, b) => a - b);
    deep.shift();
    deep.shift();
    let layout = [];
    let temp = [];
    routes.forEach((route) => {
      if (route.cid === 0) layout.push(route);
      else temp.push(route);
    });
    routes = temp;
    let obj = {};
    for (let i = 0; i < deep.length; i++) {
      obj[deep[i]] = routes.filter((r) => r.deep === deep[i]);
    }
    routes.forEach((route) => {
      deep.forEach((item) => {
        let r = obj[item];
        for (let i = 0; i < r.length; i++) {
          if (route.id === r[i].cid) {
            if (!("children" in route)) {
              route.children = [];
            }
            route.children.push(r[i]);
          }
        }
      });
    });
    routes = routes.filter((r) => r.cid === 1);
    layout[0].children = routes;
    // layout = this.disposeRouter(layout)
    return routes;
  }

  async mergeRouter(routes) {
    let column = routes.find((r) => r.name === "column");
    let layout = routes.filter((r) => r.deep === 0);
    routes = routes.filter((r) => r.deep !== 0);
    routes = routes.filter((r) => r.cid !== column.id);
    let tps = await this.getTps();
    routes = routes.concat(tps);
    layout[0].children = routes;
    layout = this.disposeRouter(layout);
    return layout;
  }
  disposeRouter(routes) {
    let arr = [];
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      let obj = {
        path: route.v_path,
        component: route.component,
        meta: {
          title: route.title,
          auth: route.auth,
          call: route.call,
          icon: route.icon,
          cid: route.cid,
        },
        name: route.name,
      };
      if (route.children) {
        obj.children = route.children;
        obj.children = this.disposeRouter(obj.children);
      }
      arr.push(obj);
    }
    return arr;
  }
  async getTps() {
    let { service } = this;
    let tps = await service.db.select("tmp");
    tps = tps.length > 0 ? tps : [];
    for (var i = 0; i < tps.length; i++) {
      tps[i] = {
        ...tps[i],
        icon: "",
        cid: "",
        auth: "user",
        title: tps[i].call,
      };
    }
    return tps;
  }
}

module.exports = NodeService;
