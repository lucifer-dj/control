var bugs = require('../database/qlbugs')

module.exports = function(app) {
    //添加bug
    app.post('/bug/addbug', (req, res) => {
		let json = JSON.parse(Object.keys(req.body)[0])
        let arr = [json.title,json.state,json.class,json.auth,json.start,json.end,json.text,json.changer]
        bugs.addBug(arr).then(result => {
			console.log('cg')
			res.send({state:200,msg:"添加成功"})
		}, err => {
			res.send({state:1001,msg:"添加失败"})
		})
    })
    app.post('bug/queryall', (req, res) => {
        bugs.queryAll().then(result => {}, err => {})
    })
}

