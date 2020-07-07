let query = require('./mysql.js');

class Shin {
	constructor(){
		
	}
	save(arr,origin){
		console.log(origin)
		return  new Promise((resolve,reject)=>{
			let sql = "insert into shin (id,src,origin) values(0,?,?)";
			let index = 0;
			let len = arr.length;
			arr.forEach((item,idx)=>{
				query(sql,[item.src,origin]).then(result=>{
					index++;
					if(index>=len){
						resolve('插入'+len+'条数据成功');
					}
				},err=>{
					reject(err)
				})
			})
		})
	}
}

module.exports = new Shin();