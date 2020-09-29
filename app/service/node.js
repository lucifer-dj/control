"use strict";
const Service = require("egg").Service;

class NodeService extends Service {
 async getMenu(auth){
   let { app } = this;
   let obj = {};
   if(auth == 'user'){
     obj = {
       where: {
         auth: 'user'
       }
     }
   }
   let result = await app.mysql.select("node", obj);
  //  result = this.disposeMenu(result);
   return result
 }
 disposeMenu(menu){
   let deepArr = [];
   menu.forEach(i=>deepArr.push(i.deep))
  let maxDeep = Math.max.call(null,deepArr);
  for (let i = 1; i <= maxDeep; i++) {
   
  }
   return menu;
 }
}

module.exports = NodeService;