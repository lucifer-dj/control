'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
 module.exports = app => {
  const { router, controller } = app;
  router.post('/t', controller.panel.home.t);
  router.post('/panel/login', controller.panel.login.index)
  router.post('/panel/auto', controller.panel.login.auto)
  router.post('/panel/column',  controller.panel.column.index)
  router.post('/panel/column/add', controller.panel.column.add)
  router.post('/panel/column/read', controller.panel.column.read)
  router.post('/panel/column/update', controller.panel.column.update)
  router.post('/panel/column/delete', controller.panel.column.delete)
  router.put('/file/upload/oss', controller.file.uploadOss)
  router.put('/file/upload/serve', controller.file.uploadServe)
  router.post('/file/delete', controller.file.delete)
  router.post('/panel/case', controller.panel.case.index)
  router.post('/panel/case/add',controller.panel.case.add)
  router.post('/panel/case/delete',controller.panel.case.delete)
  router.post('/panel/case/read',controller.panel.case.read)
  router.post('/panel/case/update',controller.panel.case.update)
  router.post('/panel/page/read',controller.panel.page.read)
  router.post('/panel/page/add',controller.panel.page.add)
  router.post('/panel/page/update',controller.panel.page.update)
  router.post('/panel/product', controller.panel.product.index)
  router.post('/panel/product/add',controller.panel.product.add)
  router.post('/panel/product/delete',controller.panel.product.delete)
  router.post('/panel/product/read',controller.panel.product.read)
  router.post('/panel/product/update',controller.panel.product.update)
};
