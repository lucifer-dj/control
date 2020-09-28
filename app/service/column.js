"use strict";
const Service = require("egg").Service;

class PageService extends Service {
  //通过nid拿到对应的column然后拿到page
  async getAllColumnCount() {
    let { service } = this;
    let role = await service.db.select('role');
    let page = await service.db.select('page');
    let faction = await service.db.select('faction');
    let realm = await service.db.select('realm');
    let year = await service.db.select('year');
    return [{ name: '角色', num: role.length }, { name: '单页', num: page.length }, { name: '地域', num: faction.length }, { name: '境界', num: realm.length }, { name: '时间线', num: year.length }, ];
  }
}
module.exports = PageService;