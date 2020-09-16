module.exports = (options, app) => {
  return async function checkJwt(ctx, next) {
    for (let i of options.methods) {
      if (ctx.request.method === i.toUpperCase()) return await next();
    }
    let whiteList = options.whiteList || [];
    let whiteUrl = whiteList.some((item) => ctx.url.startsWith(item));
    if (whiteUrl) {
      // console.log("再白名单");
      return await next();
    }
    let authorization = ctx.request.header.authorization;
    if (!(authorization.length > 0)) {
      ctx.err("请重新登录", 401);
    }
    // console.log(authorization)
    let token = authorization.split(" ")[1];
    // console.log(token)
    // let info = app.jwt.verify(token, app.config.jwt.secret);
    // let result = await ctx.service.login.valid(info);
    // if (result) {
    //   await next();
    // } else {
    //   ctx.err("token 不正确，请重新获取", 401);
    // }
    try {
      let info = app.jwt.verify(token, app.config.jwt.secret);
      // console.log(info, 1)
      let result = await ctx.service.login.valid(info);
      if (result) {
        await next();
      } else {
        ctx.err("token 不正确，请重新获取", 401);
      }
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        ctx.err("token 已过期! 请重新获取令牌", 401);
      } else {
        console.log(e);
        ctx.err("其他错误", 401);
      }
    }
  };
};