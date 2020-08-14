/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = "208002";
  // 关闭post请求拦截
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    },
    domainWhiteList: ['*']
  }
  config.bodyParser = {
    formLimit: '10mb'
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // add your middleware config here
  config.middleware = ['checkJwt']
  config.checkJwt = {
    ignore: ["/t", "/panel/login", "/panel/register"]
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'xahax',
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: ".html",
    mapping: {
      '.html': 'nunjucks',
    },
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    cache: true
  };
  config.jwt = {
    secret: '123123',
    expiresIn: 60 * 60 * 24 * 15
  }
  config.mysql = {
    // 单数据库信息配置
    client: {
      host: '119.45.57.238',
      port: '3306',
      user: 'xzhdx',
      password: '123123',
      database: 'xzhdx',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.multipart = {
    mode: 'stream',
  }
  config.publicPath = 'public/frame';
  config.staticPath = path.resolve(__dirname, "../app/static/");
  config.site = appInfo.env === 'local' ? "http://127.0.0.1:7001" : "http://119.45.57.238"

  return {
    ...config,
    ...userConfig,
  };
};