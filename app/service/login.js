const Service = require("egg").Service;

class LoginService extends Service {
  async valid(user) {
    let result = await this.getUserByAccount(user);
    if (result && user.pass.toString() === result.pass.toString())
      return {
        auth: result.auth,
        account: result.account,
      };
    else return false;
  }
  async getUserByAccount(info) {
    let { service, app } = this;
    let _info = await service.db.readSingle("user", { account: info.account });
    if (_info) return _info;
    return false;
  }
}

module.exports = LoginService;
