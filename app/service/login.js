"use strict";
const Service = require("egg").Service;

class LoginService extends Service {
  async validUser(user) {
   let info = await this.getUser(user.account);
   if(info && String(user.pass) === String(info.pass)){
     return {
       account: info.account,
       auth: info.auth
     };
   }
   return false;
  }
  async getUser(account){
    let { service } = this;
    let _info = await service.db.get("user", { account });
    if (_info) return _info;
    return false;
  }
}

module.exports = LoginService;
