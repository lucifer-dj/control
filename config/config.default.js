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
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'xahax',
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
  config.jwt = {
    secret: '123123',
    expiresIn: 60*60*24*15
  }
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '119.45.57.238',
      // 端口号
      port: '3306',
      // 用户名
      user: 'xzhdx',
      // 密码
      password: '123123',
      // 数据库名
      database: 'xzhdx',
    },

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cluster = {
    listen: {
      port: 80,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    // path: '/var/run/egg.sock',
  }
}
return {
  ...config,
  ...userConfig,
};
};

