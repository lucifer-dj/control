'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
 module.exports = app => {
  const { router, controller } = app;
  router.post('/t', controller.home.t);
  router.post('/login', controller.login.index)
  router.post('/auto', controller.login.auto)
  router.post('/column',  controller.column.index)
  router.post('/column/add', controller.column.add)
  router.post('/column/read', controller.column.read)
  router.post('/column/update', controller.column.update)
  router.post('/column/delete', controller.column.delete)
  router.put('/upload/oss', controller.upload.oss)
  router.put('/upload/serve', controller.upload.serve)
  router.post('/case', controller.case.index)
  router.post('/case/add',controller.case.add)
  router.post('/case/delete',controller.case.delete)
  router.post('/case/read',controller.case.read)
  router.post('/case/update',controller.case.update)
};
