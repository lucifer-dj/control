"use strict";
const Service = require("egg").Service;

class PageService extends Service {
  //通过nid拿到对应的column然后拿到page
  async getPageByNid(data) {
    let { service } = this;
    let column = await service.ssr.db.get("column", { nid: data.nid });
    if (!column) return false;
    let page = await service.ssr.db.get("page", { pid: column.id });
    if (!page) return { pid: column.id };
    page.pid = column.id
    return page;
  }
}

module.exports = PageService;