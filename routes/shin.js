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
                res.status(1001).send({
                    data: err,
                    msg: '链接失败'
                })
            } else {
                let $ = cheerio.load(result.body);
                let arr = [];
				if(json.type=="img"){
					$('body').find(json.type).each((index, node) => {
					        arr.push({ src: $(node).attr('src') })
					    })
					res.status(200).send({
					    data: {arr,origin:json.url},
					    msg: '成功'
					})
				}else if(json.type=="sound"){
					res.status(200).send({
					    data: result,
					    msg: '成功'
					})
				}
                
            }
        })
    })
	app.post('/shin/save',(req,res)=>{
		let json = req.body;
		console.log(json)
		sql.save(json.arr,json.origin).then(result=>{
			res.status(200).send({
			    data: 'ojbk',
			    msg: '成功'
			})
		},err=>{
			res.status(1001).send({
			    data: 'oh,no',
			    msg: '成功'
			})
		})
	})
}