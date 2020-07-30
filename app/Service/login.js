const Service = require('egg').Service;

class LoginService extends Service{
	async valid(user){
		let result = await this.getPassByAccount(user.account)
		if(result && user.pass===result) return true
		else return false
		}	
	async getPassByAccount(account){
		let sql = 'select pass from user where account=?'
		let pass = await this.app.mysql.query(sql,[account])
		if(pass.length>0)return pass[0].pass
		else return false
	}
}

module.exports = LoginService