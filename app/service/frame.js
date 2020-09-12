"use strict";
let path = require("path");
let Service = require("egg").Service;

class FrameService extends Service {
  async index() {
    let that = this;
    let { app, service, config } = that;
    let columnsModel = await service.db.select("column");
    let roles = await service.db.select("role");
    let factions = await service.db.select("faction");
    let years = await service.db.select("year");
    let banners = await service.db.select("banner");
    let realms = await service.db.select("realm", {
      limit: 4,
    });
    let site = await service.file.read("site.config.json");
    let about = await service.file.read("about.config.json");
    let columns = {};
    columnsModel.forEach((item, idx) => {
      columns[item.template] = item;
    });
    return {
      headers: columnsModel,
      columns,
      roles,
      site: site.data,
      about: about.data,
      factions,
      years,
      banners,
      realms,
    };
  }
  async role() {
    let that = this;
    let { service } = that;
    let columnsModel = await service.db.select("column");
    let site = await service.file.read("site.config.json");
    let about = await service.file.read("about.config.json");
    let roles = await service.db.select("role", {
      limit: 10,
    });
    return {
      headers: columnsModel,
      roles,
      site,
      about,
    };
  }
  /**
   * 检查通过id获取到的栏目然后通过栏目获取到的模板存不存在
   */
  async checkLink(params, query) {
    let { service } = this;
    let columns = await service.db.select("column");
    let tmps = await service.db.select("tmp");
    let _target = columns.find((c) => Number(c.id) === Number(query.id));
    if (!_target || params !== _target.link) return false;
    let _tmp = tmps.find((t) => Number(_target.template) === Number(t.id));
    if (_tmp)
      return {
        ...query,
        tmp: _tmp.template.split(".")[0],
      };
    return false;
  }
  async faction() {
    let that = this;
    let { service } = that;
    let columnsModel = await service.db.select("column");
    let site = await service.file.read("site.config.json");
    let about = await service.file.read("about.config.json");
    let factions = await service.db.select("faction", {
      limit: 10,
    });
    return {
      headers: columnsModel,
      factions,
      site,
      about,
    };
  }
  async realm() {
    let that = this;
    let { service } = that;
    let columnsModel = await service.db.select("column");
    let site = await service.file.read("site.config.json");
    let about = await service.file.read("about.config.json");
    let realms = await service.db.select("realm", {
      limit: 10,
    });
    return {
      headers: columnsModel,
      realms,
      site,
      about,
    };
  }
}

module.exports = FrameService;
