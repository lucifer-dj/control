var bugs = require('../database/qlbugs')

module.exports = function(app) {
    //添加bug
    app.post('/bug/addbug', (req, res) => {
        let json = JSON.parse(Object.keys(req.body)[0])
        let arr = [json.title, json.state, json.class, json.auth, json.start, json.end, json.text, json.changer]
        bugs.addBug(arr).then(result => {
            console.log('cg')
            res.send({ state: 200, msg: "添加成功" })
        }, err => {
            res.send({ state: 1001, msg: "添加失败" })
        })
    })
    app.post('/bug/querybugs', (req, res) => {
        bugs.queryAll().then(result => {
            res.send({ state: 200, data: result, msg: '查询成功' })
        }, err => {
            res.send({ state: 1001, data: '', msg: '查询失败' })
        })
    })
    app.post("/bug/deletebug", (req, res) => {
        let data = JSON.parse(Object.keys(req.body)[0]);
        bugs.deleteBug(data.id).then(result => {
            res.send({ state: 200, data: '', msg: '删除成功' });
        }, err => {
            res.send({ state: 1001, data: '', msg: '删除失败' });
        })
    })
    app.post("/bug/getbug", (req, res) => {
        let json = JSON.parse(Object.keys(req.body)[0]);
        console.log(json)
        bugs.getBug(json.id).then(result => {
            res.send({ state: 200, data: result, msg: '查询成功' });
        }, err => {
            res.send({ stae: 1001, data: '', msg: '查询失败' })
        })
    })
    app.post('/bug/updatebug', (req, res) => {
        let json = JSON.parse(Object.keys(req.body)[0]);
        let arr = [json.title, json.class, json.text, json.id]
        bugs.updateBug(arr).then(result => {
                res.send({ state: 200, data: result, msg: '更新成功' })
            },
            err => {
                res.send({ state: 1001, data: '', msg: '更新失败' })
            })
    })
	app.post('/bug/repairbug',(req,res)=>{
		let json = JSON.parse(Object.keys(req.body)[0]);
		let arr = [json.state,json.end,json.id]
		bugs.repqirBug(arr).then(result=>{
			res.send({ state: 200, data: '', msg: '修复成功' })
		},
		err=>{
			res.send({ state: 1001, data: '', msg: '修复失败' })
		})
	})
}