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
export function login(data = {}, obj = {}) {
  return fetch('/panel/login', data, obj)
}

//添加栏目
export function addColumn(data, obj = {}) {
  return fetch('/panel/column/add', data, obj);
}
//查询所有栏目
export function queryColumns(data = {}, obj = {}) {
  return fetch('/panel/column', data, obj);
}
//查询单个栏目
export function readColumn(data, obj = {}) {
  return fetch('/panel/column/read', data, obj)
}
//更新栏目
export function updateCol(data, obj = {}) {
  return fetch('/panel/column/update', data, obj)
}
//删除栏目
export function deleteCol(data, obj = {}) {
  return fetch('/panel/column/delete', data, obj)
}
//查询所有角色
export function queryCases(data, obj = {}) {
  return fetch('/panel/case', data, obj)
}
//添加角色
export function addCase(data, obj = {}) {
  return fetch('/panel/case/add', data, obj)
}
//查询一位绝色
export function readCase(data, obj = {}) {
  return fetch('/panel/case/read', data, obj)
}
//修改一位角色
export function updateCase(data, obj = {}) {
  return fetch('/panel/case/update', data, obj)
}
//删除一位角色
export function deleteCase(date, obj = {}) {
  return fetch('/panel/case/delete', date, obj)
}
//读取一个文章
export function readPage(data, obj = {}) {
  return fetch('/panel/page/read', data, obj)
}
//添加一篇文章
export function addPage(data, obj = {}) {
  return fetch('/panel/page/add', data, obj)
}
//更新文章内容
export function updatePage(data, obj = {}) {
  return fetch('/panel/page/update', data, obj)
}
//查询所有Product
export function queryProducts(data, obj = {}) {
  return fetch('/panel/product', data, obj)
}
//添加Product
export function addProduct(data, obj = {}) {
  return fetch('/panel/product/add', data, obj)
}
//查询一个Product
export function readProduct(data, obj = {}) {
  return fetch('/panel/product/read', data, obj)
}
//修改一个Product
export function updateProduct(data, obj = {}) {
  return fetch('/panel/product/update', data, obj)
}
//删除一个Product
export function deleteProduct(date, obj = {}) {
  return fetch('/panel/product/delete', date, obj)
}
//查询所有banner
export function queryBanners(data = {}, obj = {}) {
  return fetch('/panel/banner', data, obj)
}
//添加banner
export function addBanner(data, obj = {}) {
  return fetch('/panel/banner/add', data, obj)
}
//查询一个banner
export function readBanner(data, obj = {}) {
  return fetch('/panel/banner/read', data, obj)
}
//修改一个banner
export function updateBanner(data, obj = {}) {
  return fetch('/panel/banner/update', data, obj)
}
//删除一个banner
export function deleteBanner(date, obj = {}) {
  return fetch('/panel/banner/delete', date, obj)
}
//读取站点设置
export function readSiteConfig(data = {}, obj = {}) {
  return fetch('/config/site/read', data, obj)
}
export function updateSiteConfig(data, obj = {}) {
  return fetch('/config/site/update', data, obj)
}

//上传文件
export async function upload(data, obj = {}, deletePath = "") {
  let fm = new FormData();
  fm.append("file", data);
  try {
    let result = await fetch('/file/upload/serve', fm, obj, 'put', {
      'Content-Type': 'multipart/form-data'
    })
    if (result.code === 200) {
      if (deletePath.length > 0) {
        try {
          let result0 = await deleteFile({
            path: deletePath
          });
          if (result0.code === 200) {
            console.log('删除' + deletePath + '图片成功')
          } else {
            console.error(result0.msg, '删除' + deletePath + '失败')
          }
        } catch (e) {
          console.error(e, '删除' + deletePath + '失败')
        }
      }
      return result
    } else {
      console.error('上传图片失败')
      return false
    }
  } catch (e) {
    console.error(e)
    return false
  }
}
//删除上传的文件
export async function deleteFile(data, obj = {}) {
  try {
    let result = await fetch('/file/delete', data, obj)
    return result
  } catch (e) {
    console.log(e)
    return false
  }
}

function fetch(url, data, obj, method = "post", headers = {
  "Content-Type": 'application/json;charset=UTF-8'
}) {
  if (checkObjectIsEmpty(obj)) obj = temp
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