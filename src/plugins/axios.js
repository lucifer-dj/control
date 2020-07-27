import axios from 'axios'

const Service = axios.create({
  timeout:7000,
  baseURL: "http://127.0.0.1:7001/",
  method:'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
Service.interceptors.request.use(config => {
  if(config.method==='post'){
    config.data = JSON.stringify(config.data)
  }
 console.log(config)
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  console.log(response)
  return response
}, error => {
  console.log('TCL: error', error)
  return Promise.reject(error)
})

export default Service;