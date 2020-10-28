"use strict";
let path = require("path");
let fs = require("fs");
let sendToWormhole = require("stream-wormhole");
const Service = require("egg").Service;

class FileService extends Service {
  async read(src) {
    let that = this;
    let { config } = that;
    src = path.join(config.staticPath, src);
    return new Promise(async (resolve, reject) => {
      if (!fs.existsSync(src)) {
        return false;
      }
      let data = "";
      let stream = fs.createReadStream(src);
      stream.setEncoding("UTF8");
      stream.on("data", function(chunk) {
        data += chunk;
      });
      stream.on("end", async function() {
        if (data.length > 0) {
          data = JSON.parse(data);
        }
        resolve(data);
        await sendToWormhole(stream);
      });
      stream.on("error", function(e) {
        reject(e);
      });
      // fs.create
    });
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
  readFiles(src) {
    return new Promise((resolve, reject) => {
      fs.readdir(src, "utf8", function(err, files) {
        if (err) return reject(err);
        resolve(files);
      });
    });
  }
}

module.exports = FileService;