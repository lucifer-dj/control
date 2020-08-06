export default {
	isdev: ['development'].includes(process.env.NODE_ENV),
	tp: {
		tpPase: {
			name: "单页模板",
			en: "tpPase",
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
	}
}