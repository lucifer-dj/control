const Service = require('egg').Service;

class LoginService extends Service{
	async valid(user){
		let result = await this.getPassByAccount(user.account)
		if(user.pass===result) return true
			else return false
		}	
	async getPassByAccount(account){
		let sql = 'select pass from user where account=?'
		let pass = await this.app.mysql.query(sql,[account])
		return pass[0].pass
	}
}

module.exports = LoginService