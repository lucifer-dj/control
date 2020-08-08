const Service = require('egg').Service;

class LoginService extends Service{
	async valid(user){
		let result = await this.getPassByAccount(user.account)
		if(result && user.pass.toString()===result.toString())return true
			else return false
		}	
	async getPassByAccount(account){
		let sql = 'select pass from user where account=?'
		let result = await this.app.mysql.query(sql,[account])
		if(result.length>0)return result[0].pass
			else return false
		}
}

module.exports = LoginService