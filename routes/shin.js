//学习爬取页面
let request = require('request');
let cheerio = require('cheerio');

module.exports = function(app) {
    app.post('/shin', (req, res) => {
        let startUrl = 'https://www.baidu.com/'
        request({
            url: startUrl, //请求路径
            method: "GET", //请求方式，默认为get
            headers: { //设置请求头
                "content-type": "application/xhtml+xml",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                "cookie": "BIDUPSID=1ABFA9C7924FB1A7B95CAE1CCFA14F2F; PSTM=1589208141; BAIDUID=1ABFA9C7924FB1A7FDA8E446F4AB8F3D:FG=1; BD_UPN=12314753; BDUSS=G4zTWN0dllHZUViNUIzMnAzaEJGLWlnb2tOb1p3WWJDd05JbjN6R1NVTVVaLVJlRVFBQUFBJCQAAAAAAAAAAAEAAAB5oWXQampqazY3MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTavF4U2rxee; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; delPer=0; BD_CK_SAM=1; PSINO=2; COOKIE_SESSION=19644_0_9_0_11_22_1_0_9_6_4_7_19712_0_76_0_1593873083_0_1593873007%7C9%2397_3_1589209361%7C2; H_PS_PSSID=31905_1431_31326_32140_31254_32045_32230_26350_31639; BD_HOME=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_PS_645EC=b927sILJsZAFgIRuUoCGjtup3F3YzybvzojtFk6PmfbRPsESHht2b40sr9qsbyzOoHtP"
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
                $('body').find('img').each((index, node) => {
                        // console.log(node)
                        arr.push({ src: $(node).attr('src') })
                    })
                    // console.log($)
                res.send({
                    state: '200',
                    data: arr,
                    msg: '成功'
                })
            }
        })

    })
}