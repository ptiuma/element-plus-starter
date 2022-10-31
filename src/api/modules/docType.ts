import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

export const getDocTypeListApi = (): Promise<IResponse> => {
	return http.get(PORT1 + "/admin/type/index");
};

export const saveDocTypeApi = (data: any): Promise<IResponse> => {
	return http.post(PORT1 + "/admin/type/save", data);
};

export const delDocTypeApi = (ids: string[] | number[]): Promise<IResponse> => {
	return http.post(PORT1 + "/admin/type/delete", ids);
};
