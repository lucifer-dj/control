let bugs = require('./bugs')
let user = require('./users')
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
    bugs(app); //bugscaozuo
    user(app);
	shin(app)
}