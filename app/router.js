"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  //后台
  router.post("/t", controller.panel.home.postTest);
  router.get("/t", controller.panel.home.getTest);
  router.get("/panel", controller.panel.home.index);
  router.post("/panel/login", controller.panel.login.index);
  router.post("/panel/auto", controller.panel.login.auto);
  router.post("/panel/column", controller.panel.column.queryAll);
  router.post("/panel/column/add", controller.panel.column.add);
  router.post("/panel/column/read", controller.panel.column.read);
  router.post("/panel/column/update", controller.panel.column.update);
  // router.post('/panel/column/read', controller.panel.file.readColumn)
  // router.post('/panel/column/update', controller.panel.file.updateColumn)
  router.post("/panel/column/delete", controller.panel.column.delete);
  router.put("/file/upload/oss", controller.upload.uploadOss);
  router.put("/file/upload/serve", controller.upload.uploadServe);
  router.post("/file/delete", controller.upload.delete);
  router.post("/panel/role", controller.panel.role.queryAll);
  router.post("/panel/role/add", controller.panel.role.add);
  router.post("/panel/role/delete", controller.panel.role.delete);
  router.post("/panel/role/read", controller.panel.role.read);
  router.post("/panel/role/update", controller.panel.role.update);
  router.post("/panel/page/read", controller.panel.page.read);
  router.post("/panel/page/add", controller.panel.page.add);
  router.post("/panel/page/update", controller.panel.page.update);
  router.post("/panel/realm", controller.panel.realm.queryAll);
  router.post("/panel/realm/add", controller.panel.realm.add);
  router.post("/panel/realm/delete", controller.panel.realm.delete);
  router.post("/panel/realm/read", controller.panel.realm.read);
  router.post("/panel/realm/update", controller.panel.realm.update);
  router.post("/panel/site/read", controller.panel.file.readSite);
  router.post("/panel/site/update", controller.panel.file.updateSite);
  router.post("/panel/about/read", controller.panel.file.readAbout);
  router.post("/panel/about/update", controller.panel.file.updateAbout);
  router.post("/panel/banner", controller.panel.banner.queryAll);
  router.post("/panel/banner/add", controller.panel.banner.add);
  router.post("/panel/banner/delete", controller.panel.banner.delete);
  router.post("/panel/banner/read", controller.panel.banner.read);
  router.post("/panel/banner/update", controller.panel.banner.update);
  router.post("/panel/faction", controller.panel.faction.queryAll);
  router.post("/panel/faction/add", controller.panel.faction.add);
  router.post("/panel/faction/delete", controller.panel.faction.delete);
  router.post("/panel/faction/read", controller.panel.faction.read);
  router.post("/panel/faction/update", controller.panel.faction.update);
  router.post("/panel/year", controller.panel.year.queryAll);
  router.post("/panel/year/add", controller.panel.year.add);
  router.post("/panel/year/delete", controller.panel.year.delete);
  router.post("/panel/year/read", controller.panel.year.read);
  router.post("/panel/year/update", controller.panel.year.update);
  router.post("/panel/file/gettps", controller.panel.file.getTps);
  router.post("/panel/node/getRouter", controller.panel.node.getRouter);
  //前台
  router.get("/", controller.frame.index.index);
  router.get("/:column", controller.frame.column.index);
  router.get("/:column/:id", controller.frame.part.index);
};