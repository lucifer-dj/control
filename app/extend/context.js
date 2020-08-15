module.exports = {
  success(msg, data = "", code = 200) {
    this.status = 200;
    let obj = { code, msg, data };
    if (data === "") delete obj.data;
    this.body = obj;
  },
  err(msg, code = 500) {
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
