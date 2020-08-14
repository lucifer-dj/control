'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadOss() {
    //上传到腾讯对象储存上
    const { ctx, service } = this;
    let stream = await ctx.getFileStream();
    let result = await service.file.oss(stream)
    if(result) return ctx.success('上传图片成功',result)
     ctx.err('上传图片失败',1001)
 }
 async uploadServe(){
    //保存到本地
    let { ctx, service } = this;
    let stream = await ctx.getFileStream();
    let result = await service.file.serve(stream)
    if(result) return ctx.success('上传图片成功',result)
     ctx.err('上传图片失败',1001)
 }
 async delete(){
  let { ctx, service} = this;
  let req = ctx.request.body;
  if(!req.path) return ctx.err('路径错误')
    let result = await service.file.delete(req);
  if(result.state) return ctx.success(result.msg)
   ctx.err(result.msg)
}
}
module.exports = UploadController;
