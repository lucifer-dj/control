import axios from "axios";
import cfg from "./cfg.js";
import router from "@/router.js";
import Vue from "vue";
let token = localStorage.getItem("token");

const Service = axios.create({
  timeout: 20000,
  baseURL: cfg.isdev ? "http://127.0.0.1:7001" : "http://119.45.57.238",
  method: "post",
  // headers: {
  //   "Authorization": `Bearer ${token}`
  // }
});
Service.interceptors.request.use((config) => {
  if (config.method === "post") {
    config.data = JSON.stringify(config.data);
  }
  if (config.url !== "panel/login" || config.url !== "panel/register") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// 添加响应拦截器
Service.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      new Vue().bus.$hint({
        msg: response.data.msg,
        type: "error",
      });
      router.replace("/login");
    }
    if (response.data.code === 200) {
      return response.data;
    } else {
      new Vue().bus.$hint({
        msg: response.data.msg,
        type: "error",
      });
      return response;
    }
  },
  (error) => {
    new Vue().bus.$hint({
      msg: "出现错误啦。。。",
      type: "error",
    });
    console.log("TCL: error", error);
    return Promise.reject(error);
  }
);

export default Service;
