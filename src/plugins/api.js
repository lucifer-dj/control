import service from "./axios.js";
import cfg from "./cfg.js";
import { checkObjectIsEmpty } from "./util";
let temp = {
  $loading: () => ({
    close: () => {},
  }),
};
//测试
export function t(data, obj = {}) {
  return fetch("/t", data, obj);
}

//登录
export function login(data = {}, obj = {}) {
  return fetch("/panel/login", data, obj);
}
//读取站点设置
export function siteGet(data = {}, obj = {}) {
  return fetch("/panel/site/read", data, obj);
}
//修改站点设置
export function siteUpdate(data, obj = {}) {
  return fetch("/panel/site/update", data, obj);
}
export function aboutGet(data = {}, obj = {}) {
  return fetch("/panel/site/read", data, obj);
}
//修改站点设置
export function aboutUpdate(data, obj = {}) {
  return fetch("/panel/site/update", data, obj);
}
//查询所有的html
export function getHtmlList(data, obj = {}) {
  return fetch("/panel/file/getHtmlList", data, obj);
}
export function fetchRouter(data, obj = {}) {
  return fetch("/panel/node/getRouter", data, obj);
}
export function getUserInfo(data, obj = {}) {
  return fetch("/panel/user/getInfo", data, obj);
}

export class Api {
  constructor(url) {
    this.url = `/panel/${url}/`;
  }
  queryAll(data = {}, obj = {}) {
    return fetch(this.url + "queryAll", data, obj);
  }
  read(data, obj = {}) {
    return fetch(this.url + "read", data, obj);
  }
  add(data, obj = {}) {
    return fetch(this.url + "add", data, obj);
  }
  delete(data, obj = {}) {
    return fetch(this.url + "delete", data, obj);
  }
  update(data, obj = {}) {
    return fetch(this.url + "update", data, obj);
  }
}
//上传文件
export async function upload(data, obj = {}, deletePath = "") {
  let fm = new FormData();
  fm.append("file", data);
  try {
    let result = await fetch("/file/upload/serve", fm, obj, "put", {
      "Content-Type": "multipart/form-data",
    });
    if (result.code === 200) {
      if (deletePath.length > 0) {
        try {
          let result0 = await deleteFile({
            path: deletePath,
          });
          obj.$hint({
            msg: result0.msg,
            type: "error",
          });
        } catch (e) {
          console.error(e, "删除" + deletePath + "失败");
        }
      }
      return result;
    } else {
      console.error("上传图片失败");
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}
//删除上传的文件
export async function deleteFile(data, obj = {}) {
  try {
    let result = await fetch("/file/delete", data, obj);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function fetch(
  url,
  data,
  obj,
  method = "post",
  headers = {
    "Content-Type": "application/json;charset=UTF-8",
  }
) {
  if (checkObjectIsEmpty(obj)) obj = temp;
  let o = obj.$loading();
  return new Promise((resolve, reject) => {
    service({
      url,
      data,
      method,
      headers,
    }).then(
      (res) => {
        resolve(res);
        o.close();
      },
      (err) => {
        reject(err);
        o.close();
      }
    );
  });
}
