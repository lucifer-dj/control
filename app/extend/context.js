module.exports = {
  success(msg, data = "", code = 200) {
    let token = this.newToken;
    this.status = 200;
    let obj = { code, msg, data };
    if(token) {
      obj.token = token;
      this.newToken = undefined;
    };
    if (data === "") delete obj.data;
    this.body = obj;
  },
  err(msg, code = 311) {
    this.status = 200;
    this.body = { code, msg };
  },
  checkObjectIsEmpty(obj) {
    for (let i in obj) {
      return false;
    }
    return true;
  },
};
