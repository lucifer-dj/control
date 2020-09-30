"use strict";

/** @type Egg.EggPlugin */

module.exports = {
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks",
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
};
