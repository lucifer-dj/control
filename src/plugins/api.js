import fetch from './axios.js'
import cfg from './cfg.js'
//测试
export function test(data){
  return fetch({
    url:'/test',
    data
  })
}

//登录
export function login(data){
  return fetch({
    url:'/login',
    data
  })
}

//自动登录
export function loginAuto(data){
  return fetch({
    url:'/login/auto',data
  })
}
export function upload(data){
  return fetch({
    url:cfg.isdev?'upload/oss':'/upload/serve',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method:'put'
  })
}