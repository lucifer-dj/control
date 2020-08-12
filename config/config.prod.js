//run dev时的配置

module.exports = appInfo=>  {
	const config = exports = {};
	config.cluster = {
		listen: {
			port: 80,
      hostname: '119.45.57.238', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    // path: '/var/run/egg.sock',
  }
}
return {
	...config
}
}
