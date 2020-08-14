export default {
  isdev: ['development'].includes(process.env.NODE_ENV),
  menu: [{
      name: "栏目管理",
      icon: "iconfont iconfont-shebeileixingdangan",
      path: "/column",
    }, {
      name: "角色管理",
      icon: "iconfont iconfont-tuandui",
      path: "/role",
    },
    {
      name: "势力介绍",
      icon: "iconfont iconfont-dizhi",
      path: "/faction",
    },
    {
      name: "境界划分",
      icon: "iconfont iconfont-hezi",
      path: "/realm",
    },
    {
      name: "时间线",
      icon: "iconfont iconfont-shengchanjiaojie",
      path: "/year",
    },
    {
      name: "关于雪中",
      icon: "iconfont iconfont-biaoqian",
      path: "/about",
    },
    {
      name: "轮播设置",
      path: "/banner",
      icon: "iconfont iconfont-hebing",
    },
    {
      name: "其他设置",
      path: "/config",
      icon: "iconfont iconfont-baobiao",
    },
  ],
  tp: {
    role: {
      name: "角色管理",
      icon: "iconfont iconfont-tuandui",
      path: "/role",
      tp: 'role'
    },
    faction: {
      name: "势力介绍",
      icon: "iconfont iconfont-dizhi",
      path: "/faction",
      tp: 'faction'
    },
    realm: {
      name: "境界划分",
      icon: "iconfont iconfont-hezi",
      path: "/realm",
      tp: 'realm'
    },
    year: {
      name: "时间线",
      icon: "iconfont iconfont-shengchanjiaojie",
      path: "/year",
      tp: 'year'
    },
    about: {
      name: "关于雪中",
      icon: "iconfont iconfont-biaoqian",
      path: "/about",
      tp: 'about'
    },
  }
}