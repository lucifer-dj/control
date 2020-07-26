/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
 const path = require('path')
module.exports = appInfo => {
  /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
  const config = exports = {};
  // 关闭post请求拦截
  config.security = {
    csrf: false,
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = "208002";

  // add your middleware config here

  // 统一错误处理
  config.middleware = [];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(',')
  };
  return {
    ...config,
    ...userConfig,
  };
};
