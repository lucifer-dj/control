import service from './axios.js'
import cfg from './cfg.js'
import {
  checkObjectIsEmpty
} from './util'
let temp = {
  $loading: () => ({
    close: () => {}
  })
}
//测试
export function t(data, obj = {}) {
  return fetch('/t', data, obj)
}

//登录
export function login(data, obj = {}) {
  return fetch('/login', data, obj)
}

//自动登录
export function loginAuto(data, obj = {}) {
  return fetch('/login/auto', data, obj)
}
//添加栏目
export function addColumn(data, obj = {}) {
  return fetch('/column/add', data, obj);
}
//查询所有栏目
export function queryColumns(data = {}, obj = {}) {
  return fetch('/column', data, obj);
}
//查询单个栏目
export function readColumn(data, obj = {}) {
  return fetch('/column/read', data, obj)
}
//更新栏目
export function editCol(data, obj = {}) {
  return fetch('/column/update', data, obj)
}
//删除栏目
export function deleteCol(data, obj = {}) {
  return fetch('/column/delete', data, obj)
}

//上传文件
export function upload(data, obj = {}) {
  return fetch(cfg.isdev ? '/upload/oss' : '/upload/serve', data, obj, 'put', {
    'Content-Type': 'multipart/form-data'
  })
}

function fetch(url, data, obj, method = "post", headers = {
  "Content-Type": 'application/json;charset=UTF-8'
}) {
  if (!checkObjectIsEmpty(obj)) obj = temp
  let o = obj.$loading()
  return new Promise((resolve, reject) => {
    service({
      url,
      data,
      method,
      headers
    }).then(res => {
      resolve(res)
      o.close();
    }, err => {
      reject(err)
      o.close();
    })
  })
}