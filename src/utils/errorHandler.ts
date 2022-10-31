import { ElNotification } from "element-plus";

/**
 * @description 全局代码错误捕捉
 * */

const errorHandler = (error: any) => {
	// 过滤 HTTP 请求错误
	if (error.status || error.status == 0) return false;
	let errorMap: { [key: string]: string } = {
		InternalError: "Внутренняя ошибка JavaScript",
		ReferenceError: "Объект не найден",
		TypeError: "Используется неправильный тип или объект",
		RangeError: "Параметр вне допустимого диапазона",
		SyntaxError: "Синтаксическая ошибка",
		EvalError: "Неправильное использование Eval",
		URIError: "Ошибка URI"
	};
	let errorName = errorMap[error.name] || "неизвестная ошибка";
	console.log(error);
	ElNotification({
		title: errorName,
		message: error,
		type: "error",
		duration: 3000
	});
};

export default errorHandler;
