'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.index)
  router.post('/login/auto', app.jwt, controller.login.auto)
  // router.resources('/user', controller.user)
};
