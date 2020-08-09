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
const Service = require('egg').Service;

class FileService extends Service{
	async oss(stream){
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
      	return result.Location
      }else{
      	return false
      } 
    }catch(err){
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
      return false
    } 
	}
	async serve(stream){
		let { config } = this;
		let filename = md5(Date.now()) + path.extname(stream.filename).toLocaleLowerCase();
    let target = path.join(config.baseDir, 'app/public/uploads', filename)
    let writeStream = fs.createWriteStream(target);
    try{
      await awaitWriteStream(stream.pipe(writeStream))
      let fn = ''
      if(config.env==='local')       
       fn = `http://${config.cluster.listen.hostname}:${config.cluster.listen.port}/public/uploads/${filename}`
     return fn
   	}catch(e){
    	console.log(e)
    	await sendToWormhole(stream);
    	throw e;
    	return false;
    }
	}
	async delete(data){
		function unlink(src){
			return new Promise((resolve,reject)=>{
				fs.unlink(src,function(err){
					if(err) return reject(err)
					resolve(true)
				})
			})
		}
		let p = path.resolve(__dirname,'../public/uploads')
		let fn = path.basename(data.path);
		let src = path.join(p,fn)
		if(fs.existsSync(src)){
			let result = await unlink(src);
			if(result) return {
				state:true,
				msg:'删除成功'
			}
			else return {
			state: false,
			msg:'删除失败'
		};;
		}
		else return {
			state: false,
			msg:'文件不存在'
		};
		
	}
}

module.exports = FileService;