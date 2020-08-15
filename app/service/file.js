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

class FileService extends Service {
  mkdir(path, opts = {
    recursive: true
  }) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, opts, function(err) {
        if (err) return reject(err);
        resolve({
          state: true,
          msg: '创建成功'
        });
      })
    })
  }
  writeFile(src, data, opts = { encoding: "utf8", mode: "0666", flag: "w" }) {
    return new Promise((resolve, reject) => {
      fs.writeFile(src, data, opts, function(err) {
        if (err) {
          reject(err);
          console.log("写入文件失败");
          return;
        }
        resolve(true);
      })
    })
  }
  unlink(src) {
    return new Promise((resolve, reject) => {
      fs.unlink(src, function(err) {
        if (err) return reject(err)
        resolve(true)
      })
    })
  }
  putFile(obj) {
    return new Promise((resolve, reject) => {
      cos.putObject(obj, function(err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
  async oss(stream) {
    // console.log(stream)
    let that = this;
    let filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
    try {
      let result = await that.putFile({
        Bucket: 'lucifer-1300320221',
        Region: 'ap-nanjing',
        Key: filename,
        Body: stream,
        onProgress: function(progressData) {
          console.log('progress', progressData); //返回信息，包括路径
        }
      })
      if (result) {
        return result.Location;
      } else {
        return false;
      }
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
      return false;
    }
  }
  async serve(stream) {
    let that = this;
    let {
      config
    } = that;
    let filename = md5(Date.now()) + path.extname(stream.filename).toLocaleLowerCase();
    let floder = path.join(config.baseDir, 'app/public/uploads');
    if (!fs.existsSync(floder)) {
      let res0 = await that.mkdir(floder);
      if (!res0.state) {
        console.log(`创建目录${floder}失败！`);
        return false;
      }
    }
    let target = path.join(config.baseDir, 'app/public/uploads', filename);
    let writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      let fn = `${config.site}/public/uploads/${filename}`;
      return fn;
    } catch (e) {
      console.log(e);
      await sendToWormhole(stream);
      throw e;
      return false;
    }
  }
  async delete(data) {
    let p = path.resolve(__dirname, '../public/uploads');
    let fn = path.basename(data.path);
    let src = path.join(p, fn);
    if (fs.existsSync(src)) {
      let result = await this.unlink(src);
      return `成功删除文件${data}`
    } else return `文件${data}不存在`
  }
  async read(src) {
    let that = this;
    let { config } = that;
    src = path.join(config.staticPath, src);
    return new Promise(async (resolve, reject) => {
      if (!fs.existsSync(src)) {
        resolve({ data: "", state: true });
        return;
      }
      let data = '';
      let stream = fs.createReadStream(src);
      stream.setEncoding('UTF8');
      stream.on('data', function(chunk) {
        data += chunk;
      });
      stream.on('end', async function() {
        if (data.length > 0) {
          data = JSON.parse(data)
        }
        resolve({ data, state: true });
        await sendToWormhole(stream);
      })
      stream.on('error', function(e) {
        reject(e)
      })
      // fs.create
    })
  }
  update(src, data) {
    let that = this;
    let { ctx, config } = that;
    src = path.resolve(config.staticPath, src);
    if (!ctx.checkObjectIsEmpty(data)) {
      data = JSON.stringify(data);
    }
    return that.writeFile(src, data);
  }
}

module.exports = FileService;