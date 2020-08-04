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
  router.post('/role', controller.role.index)
  router.post('/role/add',controller.role.add)
  router.post('/role/delete',controller.role.delete)
  router.post('/role/read',controller.role.read)
  router.post('/role/update',controller.role.update)
};
