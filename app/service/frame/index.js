let Service = require('egg').Service;

class IndexService extends Service {
  async header(){
    let { app, service, config } = this;
    let result = await service.db.queryAll('column');
    result.forEach((item,idx)=>{
      item.link = config.site+'/'+item.link
    })
    return result
  }
}

module.exports = IndexService;