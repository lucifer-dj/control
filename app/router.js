"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
	const { router, controller } = app;
	//后台请求全部都是post 前台全是get <=不需要token验证
	router.post("/t", controller.test.home.postTest);
	router.get("/t", controller.test.home.getTest);
  // 单页面
  router.get("/spa", controller.spa.home.index);
  router.post("/spa/login", controller.login.index);
	router.post("/spa/getUserInfo", controller.login.getUserInfo);
	router.post("/spa/column/queryAll", controller.spa.column.queryAll);
	router.post("/spa/column/add", controller.spa.column.add);
	router.post("/spa/column/read", controller.spa.column.read);
	router.post("/spa/column/update", controller.spa.column.update);
	router.post("/spa/column/delete", controller.spa.column.delete);
  router.post("/spa/column/columnCount", controller.spa.column.columnCount);
  router.post("/spa/column/getHtmlList", controller.spa.column.getHtmlList);
	router.post("/spa/role/queryAll", controller.spa.role.queryAll);
	router.post("/spa/role/add", controller.spa.role.add);
	router.post("/spa/role/delete", controller.spa.role.delete);
	router.post("/spa/role/read", controller.spa.role.read);
	router.post("/spa/role/update", controller.spa.role.update);
	router.post("/spa/page/read", controller.spa.page.read);
	router.post("/spa/page/add", controller.spa.page.add);
	router.post("/spa/page/update", controller.spa.page.update);
	router.post("/spa/page/byNid", controller.spa.page.readPageByNid);
	router.post("/spa/realm/queryAll", controller.spa.realm.queryAll);
	router.post("/spa/realm/add", controller.spa.realm.add);
	router.post("/spa/realm/delete", controller.spa.realm.delete);
	router.post("/spa/realm/read", controller.spa.realm.read);
	router.post("/spa/realm/update", controller.spa.realm.update);
	router.post("/spa/site/read", controller.spa.file.readSite);
	router.post("/spa/site/update", controller.spa.file.updateSite);
	router.post("/spa/banner/queryAll", controller.spa.banner.queryAll);
	router.post("/spa/banner/add", controller.spa.banner.add);
	router.post("/spa/banner/delete", controller.spa.banner.delete);
	router.post("/spa/banner/read", controller.spa.banner.read);
	router.post("/spa/banner/update", controller.spa.banner.update);
	router.post("/spa/faction/queryAll", controller.spa.faction.queryAll);
	router.post("/spa/faction/add", controller.spa.faction.add);
	router.post("/spa/faction/delete", controller.spa.faction.delete);
	router.post("/spa/faction/read", controller.spa.faction.read);
	router.post("/spa/faction/update", controller.spa.faction.update);
	router.post("/spa/year/queryAll", controller.spa.year.queryAll);
	router.post("/spa/year/add", controller.spa.year.add);
	router.post("/spa/year/delete", controller.spa.year.delete);
	router.post("/spa/year/read", controller.spa.year.read);
	router.post("/spa/year/update", controller.spa.year.update);
	router.post("/spa/tmp/queryAll", controller.spa.tmp.queryAll);
	router.post("/spa/tmp/add", controller.spa.tmp.add);
	router.post("/spa/tmp/delete", controller.spa.tmp.delete);
	router.post("/spa/tmp/read", controller.spa.tmp.read);
	router.post("/spa/tmp/update", controller.spa.tmp.update);
	router.post("/spa/node/getRouter", controller.spa.node.getRouter);
	router.post("/spa/node/getMenu", controller.spa.node.getMenu);
	router.post("/spa/node/queryAll", controller.spa.node.queryAll);
	router.post("/spa/node/add", controller.spa.node.add);
	router.post("/spa/node/delete", controller.spa.node.delete);
	router.post("/spa/node/read", controller.spa.node.read);
	router.post("/spa/node/update", controller.spa.node.update);

	//服务端渲染 
	router.get("/ssr/getUserInfo", controller.login.getUserInfo);
	router.post("/ssr/login", controller.login.index);
	router.post("/ssr/column/queryAll", controller.ssr.column.queryAll);
	router.post("/ssr/column/add", controller.ssr.column.add);
	router.post("/ssr/column/read", controller.ssr.column.read);
	router.post("/ssr/column/update", controller.ssr.column.update);
	router.post("/ssr/column/delete", controller.ssr.column.delete);
	router.post("/ssr/column/columnCount", controller.ssr.column.columnCount);
	router.put("/ssr/file/upload/oss", controller.upload.uploadOss);
	router.put("/ssr/file/upload/serve", controller.upload.uploadServe);
	router.post("/ssr/file/delete", controller.upload.delete);
	router.post("/ssr/role/queryAll", controller.ssr.role.queryAll);
	router.post("/ssr/role/add", controller.ssr.role.add);
	router.post("/ssr/role/delete", controller.ssr.role.delete);
	router.post("/ssr/role/read", controller.ssr.role.read);
	router.post("/ssr/role/update", controller.ssr.role.update);
	router.post("/ssr/page/read", controller.ssr.page.read);
	router.post("/ssr/page/add", controller.ssr.page.add);
	router.post("/ssr/page/update", controller.ssr.page.update);
	router.post("/ssr/page/byNid", controller.ssr.page.readPageByNid);
	router.post("/ssr/realm/queryAll", controller.ssr.realm.queryAll);
	router.post("/ssr/realm/add", controller.ssr.realm.add);
	router.post("/ssr/realm/delete", controller.ssr.realm.delete);
	router.post("/ssr/realm/read", controller.ssr.realm.read);
	router.post("/ssr/realm/update", controller.ssr.realm.update);
	router.post("/ssr/site/read", controller.ssr.file.readSite);
	router.post("/ssr/site/update", controller.ssr.file.updateSite);
	router.post("/ssr/banner/queryAll", controller.ssr.banner.queryAll);
	router.post("/ssr/banner/add", controller.ssr.banner.add);
	router.post("/ssr/banner/delete", controller.ssr.banner.delete);
	router.post("/ssr/banner/read", controller.ssr.banner.read);
	router.post("/ssr/banner/update", controller.ssr.banner.update);
	router.post("/ssr/faction/queryAll", controller.ssr.faction.queryAll);
	router.post("/ssr/faction/add", controller.ssr.faction.add);
	router.post("/ssr/faction/delete", controller.ssr.faction.delete);
	router.post("/ssr/faction/read", controller.ssr.faction.read);
	router.post("/ssr/faction/update", controller.ssr.faction.update);
	router.post("/ssr/year/queryAll", controller.ssr.year.queryAll);
	router.post("/ssr/year/add", controller.ssr.year.add);
	router.post("/ssr/year/delete", controller.ssr.year.delete);
	router.post("/ssr/year/read", controller.ssr.year.read);
	router.post("/ssr/year/update", controller.ssr.year.update);
	router.post("/ssr/file/getHtmlList", controller.ssr.file.getHtmlList);
	router.post("/ssr/tmp/queryAll", controller.ssr.tmp.queryAll);
	router.post("/ssr/tmp/add", controller.ssr.tmp.add);
	router.post("/ssr/tmp/delete", controller.ssr.tmp.delete);
	router.post("/ssr/tmp/read", controller.ssr.tmp.read);
	router.post("/ssr/tmp/update", controller.ssr.tmp.update);
	router.post("/ssr/node/getRouter", controller.ssr.node.getRouter);
	router.post("/ssr/node/getMenu", controller.ssr.node.getMenu);
	router.post("/ssr/node/queryAll", controller.ssr.node.queryAll);
	router.post("/ssr/node/add", controller.ssr.node.add);
	router.post("/ssr/node/delete", controller.ssr.node.delete);
	router.post("/ssr/node/read", controller.ssr.node.read);
	router.post("/ssr/node/update", controller.ssr.node.update);
	//前台
  router.get("/", controller.frame.index.index);
	router.get("/frame/:column", controller.frame.column.index);
	router.get("/frame/:column/:id", controller.frame.part.index);
};
