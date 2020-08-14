export default {
	isdev: ['development'].includes(process.env.NODE_ENV),
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
			name: "关于雪中",
			icon: "iconfont iconfont-dingshi",
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
	]
}