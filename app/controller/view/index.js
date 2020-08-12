const Controller  = require('egg').Controller;

class IndexController extends Controller{
	async index(){
		let { ctx, service } = this;
		ctx.body = "<h1>hello world</h1>"
	}
}

module.exports = IndexController;