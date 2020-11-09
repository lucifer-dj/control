
module.exports = (options, app) => {
  return async function checkJwt(ctx, next) {
    // return await next();
    if(ctx.request.method.toLowerCase() === 'get'){
      return await next();
    }
    let whiteList =["/t", "/spa/login", "/spa/register","/ssr/login", "/ssr/register"];
    let whiteUrl = whiteList.some((item) => ctx.url.startsWith(item));
    if (whiteUrl) {
      console.log(`当前路由${  ctx.url }===>在白名单`);
      return await next();
    }
    let authorization = ctx.request.header.authorization;
    if (!(authorization.length > 0)) {
      return  ctx.err("没有token请重新登录", 401);
    }
    let token = authorization.split(" ")[1];
    // console.log(token);
    try {
      let info = app.jwt.verify(token, app.config.jwt.secret);
      let result = await ctx.service.login.validUser(info);
      if (result) {
				let diffVal = new Date().valueOf() - info.time;
				if(diffVal > 43200000  / 2){ // 时间大于过期时间的一般自动更新token
					console.log('无操作时间大于过期时间的一半，无感更新TOKEN');
					let newtoken = app.jwt.sign({
					  account: info.account,
					  pass: info.pass,
						time: new Date().valueOf()
					}, app.config.jwt.secret, {
					  expiresIn: '12h'
					})
					ctx.newToken = newtoken;
				}
        await next();
      } else {
        console.log('token 解密后与数据库里的信息不符');
        return ctx.err("token 不正确，请重新获取", 401);
      }
    } catch (e) {
			console.log(e);
      if (e.name === "TokenExpiredError") {
				 ctx.err("令牌TOKEN已过期请，登录重新获取", 401);
      } else {
        ctx.err("其他错误", 401);
      }
    }
  };
};