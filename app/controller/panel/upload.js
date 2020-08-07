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
  async oss() {
    //上传到腾讯对象储存上
    const { ctx } = this;
    let stream = await ctx.getFileStream();
    // console.log(stream)
    let filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();

    function putFile(obj){
      return new Promise((resolve,reject)=>{
        cos.putObject(obj,function(err,data){
          if(err) return reject(err)
            resolve(data)
        })
      })
    }
    try{
      let result = await putFile({
        Bucket: 'lucifer-1300320221',
        Region: 'ap-nanjing',
        Key: filename,
        Body: stream,
        onProgress: function(progressData) {
          console.log('progress',progressData);//返回信息，包括路径
        }
      })
      if(result){
        ctx.success('上传成功', result.Location)
      }else{
        ctx.err('上传失败',1001)
      } 
    }catch(err){
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
      ctx.err('上传失败',1001)
    }
    
    
    
  }
  async serve(){
    //保存到本地
    let { ctx, config } = this;
    let stream = await ctx.getFileStream();
    console.log(stream)
    let filename = md5(Date.now()) + path.extname(stream.filename).toLocaleLowerCase();
    let target = path.join(config.baseDir, 'app/public/uploads', filename)
    let writeStream = fs.createWriteStream(target);
    try{
      await awaitWriteStream(stream.pipe(writeStream))
      ctx.success('上传成功','public/uploads/' + filename,)
    }catch(e){
      console.log(e)
      await sendToWormhole(stream);
      throw e;
      ctx.err('上传失败',1001)
    }
    

  }

}

module.exports = UploadController;
