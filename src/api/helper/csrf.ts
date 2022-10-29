import http from "@/api";

export default {
	getCookie() {
		return http.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie");
	}
};
