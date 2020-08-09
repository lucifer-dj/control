'use strict';
let COS = require('cos-nodejs-sdk-v5');
let path = require('path')
let fs = require('fs')
let awaitWriteStream = require('await-stream-ready').write
let sendToWormhole = require('stream-wormhole')
let md5 = require('md5')
let cos = new COS({
	SecretId: 'AKIDe38YhaYVYJnz5vaopZ3GCzWprc6qrahZ',
	SecretKey: 'g5E6h02v8rOdbIisv0pOlrjhPq0cyINl'
})
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadOss() {
    //上传到腾讯对象储存上
    const { ctx, service } = this;
    let stream = await ctx.getFileStream();
    let ressult = await service.file.oss(stream)
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
    let result = await service.file.delete(req);
    if(result.state) return ctx.success(result.msg)
     ctx.err(result.msg)
  }
}
module.exports = UploadController;
