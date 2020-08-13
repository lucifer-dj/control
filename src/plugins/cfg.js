export default {
	isdev: ['development'].includes(process.env.NODE_ENV),
	tp: {
		tpPage: {
			name: "单页模板",
			en: "tpPage",
			path: "/tp/page",
			icon: 'iconfont-guanyu',
		},
		tpProduct: {
			name: "势力划分",
			en: "tpProduct",
			path: "/tp/product",
			icon: 'iconfont-dizhi'
		},
		tpCase: {
			name: "角色管理",
			en: "tpCase",
			path: "/tp/case",
			icon: 'iconfont-tuandui'
		},
	},
	menu: [{
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
			icon: "iconfont iconfont-dingshi",
			path: "/year",
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
	]
}