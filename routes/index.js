let bugs = require('./bugs')
let shin = require('./shin.js')

/* GET home page. */

module.exports = function(app) {
    app.all("*", function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
        );
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", " 3.2.1");
        if (req.method == "OPTIONS") res.send(200);
        /*让options请求快速返回*/
        else next();
    });
    app.get("/t",function(req,res){
        res.send("测试项目状态")
    })
	app.get("/",function(req,res){
		res.render("index.html");
	})
    bugs(app);
	shin(app)
}