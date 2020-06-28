var bugs = require('../database/qlbugs')

module.exports = function(app) {
    //添加bug
    app.post('bug/addbug', (req, res) => {
        let arr = []
        bugs.addBug(arr).then(result => {}, err => {})
    })
    app.post('bug/queryall', (req, res) => {
        bugs.queryAll().then(result => {}, err => {})
    })
}