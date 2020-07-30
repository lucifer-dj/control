'use strict';
// let COS = require('cos-nodejs-sdk-v5');
// let path = require('path')
// let cos = new COS({
// 	SecretId: 'AKIDe38YhaYVYJnz5vaopZ3GCzWprc6qrahZ',
// 	SecretKey: 'g5E6h02v8rOdbIisv0pOlrjhPq0cyINl'
// })
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async index() {
    const { ctx } = this;

    let stream = await ctx.getFileStream();
    console.log(stream)
    let filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
    cos.putObject({
    	Bucket:'dsdskdjkls',
    	Region: 'ap-shanxi',
    	Key: filename,
    	Body: stream,
    	onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));//返回信息，包括路径
       }
    },
    function(err,data){
    	console.log(err||data)

    })
  }
}

module.exports = UploadController;
