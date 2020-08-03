module.exports = {
	success(msg,data='',code=200){
		this.status = 200;
		let obj = {
			code,
			msg,
			data
		}
		if(data==='')
			delete obj.data
		this.body = obj
	},
	err(msg,code=500){
		this.status = 400;
		this.body = {
			code,
			msg
		}
	}
}