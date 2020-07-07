//学习爬取页面
let request = require('request');
let cheerio = require('cheerio');
let sql = require('../database/qlshin.js')
module.exports = function(app) {
    app.post('/shin', (req, res) => {
		let json = req.body
        request({
            url: json.url, //请求路径
            method: "GET", //请求方式，默认为get
            headers: { //设置请求头
                "content-type": "application/xhtml+xml",
                "User-Agent": json.agent,
                "cookie": json.cookie
            }
        }, (err, result) => {
            if (err) {
                res.send({
                    state: '1001',
                    data: err,
                    msg: '链接失败'
                })
            } else {
                let $ = cheerio.load(result.body);
                let arr = [];
                $('body').find(json.type).each((index, node) => {
                        arr.push({ src: $(node).attr('src') })
                    })
                res.send({
                    state: '200',
                    data: {arr,origin:json.url},
                    msg: '成功'
                })
            }
        })
    })
	app.post('/shin/save',(req,res)=>{
		let json = req.body;
		console.log(json)
		sql.save(json.arr,json.origin).then(result=>{
			res.send({
			    state: '200',
			    data: 'ojbk',
			    msg: '成功'
			})
		},err=>{
			res.send({
			    state: '1001',
			    data: 'oh,no',
			    msg: '成功'
			})
		})
	})
}