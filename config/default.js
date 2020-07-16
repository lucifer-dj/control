const ISDEV = true
let address = '119.45.57.238'

let prod = {
	DATABASE: 'sysdb',
	USER: 'sysdb',
	PASS: '33HLfNCwmCnLjmSi',
	PORT: '3306',
	HOST: '127.0.0.1'
}

let dev = {
        DATABASE: 'js',
        USER: 'root',
        PASS: '123456',
        PORT: '3306',
        HOST: '127.0.0.1'
}
module.exports = {
	isdev:ISDEV,
    port: ISDEV?3000:80,
    mysql: ISDEV?dev:prod,
	address:ISDEV?'127.0.0.1':address
}
