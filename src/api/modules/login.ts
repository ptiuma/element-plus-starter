import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
//import qs from "qs";
import http from "@/api";
//import csrf from "@/api/helper/csrf";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	http.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie");
	return http.post<Login.ResLogin>(PORT1 + `/login`, params); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
};

// * 获取按钮权限
export const getAuthButtonListApi = () => {
	return {};
};

// * 获取菜单列表
export const getAuthMenuListApi = () => {
	return DynamicRouter;
};
