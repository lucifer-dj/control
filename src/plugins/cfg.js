export default {
  isdev: ['development'].includes(process.env.NODE_ENV),
  tp: {
    role: {
      name: "角色管理",
      path: "/role",
      tp: 'role'
    },
    faction: {
      name: "势力介绍",
      path: "/faction",
      tp: 'faction'
    },
    realm: {
      name: "境界划分",
      path: "/realm",
      tp: 'realm'
    },
    year: {
      name: "时间线",
      path: "/year",
      tp: 'year'
    },
    about: {
      name: "关于雪中",
      path: "/about",
      tp: 'about'
    },
  },
  icons: [
    "iconfont iconfont-tuandui", "iconfont iconfont-dizhi", "iconfont iconfont-hezi", "iconfont iconfont-shengchanjiaojie", "iconfont iconfont-biaoqian",
  ]
}