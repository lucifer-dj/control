const path = require('path');
const fs = require('fs')
const Service = require('egg').Service;

class SiteService extends Service{
	constructor(app){
		super(app);
		this.path = path.resolve(__dirname,'../../config/site.config.json')
	}
	read(){
		return new Promise((resolve,reject)=>{
			let data = '';
			let stream = fs.createReadStream(this.path);
			stream.setEncoding('UTF8');
			stream.on('data',function(chunk){
				data+=chunk;
			});
			stream.on('end',function(){
				data = JSON.parse(data.replace(/(\r|\n)/gi,""))
				resolve({data,state:true});
			})
			stream.on('error',function(e){
				reject(e)
			})
			// fs.create
		})
	}	
	update(data){
		return new Promise((resolve,reject)=>{
			data = JSON.stringify(data)
			let stream = fs.createWriteStream(this.path);
			stream.write(data,'UTF8');
			stream.end();
			stream.on('finish',function(){
				resolve({state: true})
			})
			stream.on('error',function(err){
				reject(err);
			})
		})
	}
}

module.exports = SiteService