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

//添加栏目
export function addColumn(data, obj = {}) {
  return fetch("/panel/column/add", data, obj);
}
//查询所有栏目
export function columnQueryAll(data = {}, obj = {}) {
  return fetch("/panel/column", data, obj);
}
//查询单个栏目
export function readColumn(data, obj = {}) {
  return fetch("/panel/column/read", data, obj);
}
//更新栏目
export function updateColumn(data, obj = {}) {
  return fetch("/panel/column/update", data, obj);
}
//删除栏目
export function deleteColumn(data, obj = {}) {
  return fetch("/panel/column/delete", data, obj);
}
//查询所有角色
export function roleQueryAll(data = {}, obj = {}) {
  return fetch("/panel/role", data, obj);
}
//添加角色
export function roleAdd(data, obj = {}) {
  return fetch("/panel/role/add", data, obj);
}
//查询一个角色
export function roleRead(data, obj = {}) {
  return fetch("/panel/role/read", data, obj);
}
//修改一个角色
export function roleUpdate(data, obj = {}) {
  return fetch("/panel/role/update", data, obj);
}
//删除一个角色
export function roleDelete(date, obj = {}) {
  return fetch("/panel/role/delete", date, obj);
}
//查询所有势力
export function factionQueryAll(data = {}, obj = {}) {
  return fetch("/panel/faction", data, obj);
}
//添加势力
export function factionAdd(data, obj = {}) {
  return fetch("/panel/faction/add", data, obj);
}
//查询一个势力
export function factionRead(data, obj = {}) {
  return fetch("/panel/faction/read", data, obj);
}
//修改一个势力
export function factionUpdate(data, obj = {}) {
  return fetch("/panel/faction/update", data, obj);
}
//删除一个势力
export function factionDelete(date, obj = {}) {
  return fetch("/panel/faction/delete", date, obj);
}
//读取一个文章
export function readPage(data, obj = {}) {
  return fetch("/panel/page/read", data, obj);
}
//添加一篇文章
export function addPage(data, obj = {}) {
  return fetch("/panel/page/add", data, obj);
}
//更新文章内容
export function updatePage(data, obj = {}) {
  return fetch("/panel/page/update", data, obj);
}
//查询所有时间线
export function yearQueryAll(data = {}, obj = {}) {
  return fetch("/panel/year", data, obj);
}
//添加时间线
export function yearAdd(data, obj = {}) {
  return fetch("/panel/year/add", data, obj);
}
//查询一个时间线
export function yearRead(data, obj = {}) {
  return fetch("/panel/year/read", data, obj);
}
//修改一个时间线
export function yearUpdate(data, obj = {}) {
  return fetch("/panel/year/update", data, obj);
}
//删除一个时间线
export function yearDelete(date, obj = {}) {
  return fetch("/panel/year/delete", date, obj);
}
//查询所有境界
export function realmQueryAll(data = {}, obj = {}) {
  return fetch("/panel/realm", data, obj);
}
//添加境界
export function realmAdd(data, obj = {}) {
  return fetch("/panel/realm/add", data, obj);
}
//查询一个境界
export function realmRead(data, obj = {}) {
  return fetch("/panel/realm/read", data, obj);
}
//修改一个境界
export function realmUpdate(data, obj = {}) {
  return fetch("/panel/realm/update", data, obj);
}
//删除一个境界
export function realmDelete(date, obj = {}) {
  return fetch("/panel/realm/delete", date, obj);
}
//查询所有轮播
export function bannerQueryAll(data = {}, obj = {}) {
  return fetch("/panel/banner", data, obj);
}
//添加轮播
export function bannerAdd(data, obj = {}) {
  return fetch("/panel/banner/add", data, obj);
}
//查询一个轮播
export function bannerRead(data, obj = {}) {
  return fetch("/panel/banner/read", data, obj);
}
//修改一个轮播
export function bannerUpdate(data, obj = {}) {
  return fetch("/panel/banner/update", data, obj);
}
//删除一个轮播
export function bannerDelete(date, obj = {}) {
  return fetch("/panel/banner/delete", date, obj);
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
//查询所有轮播
export function tpQueryAll(data = {}, obj = {}) {
  return fetch("/panel/tps", data, obj);
}
//添加轮播
export function tpAdd(data, obj = {}) {
  return fetch("/panel/tp/add", data, obj);
}
//查询一个轮播
export function tpRead(data, obj = {}) {
  return fetch("/panel/tp/read", data, obj);
}
//修改一个轮播
export function tpUpdate(data, obj = {}) {
  return fetch("/panel/tp/update", data, obj);
}
//删除一个轮播
export function tpDelete(data, obj = {}) {
  return fetch("/panel/tp/delete", data, obj);
}
export function getRouter(data, obj = {}) {
  return fetch("/panel/node/getRouter", data, obj);
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