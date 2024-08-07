import axios from 'axios';

import { getCookieValue } from '../utils/StorageFn';

const instance = axios.create({ timeout: 60000 });
// 添加请求拦截器
instance.interceptors.request.use(
	(config_) => {
		config_.headers.setAccept('application/json, text/plain, */*');
		// 添加token
		const token = getCookieValue('token') || '';
		if (token) {
			config_.headers['Authorization'] = 'Bearer ' + token;
		}

		return config_;
	},
	(error) => {
		// console.log('请求拦截器:', error);
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		//console.log('统一error:', error);
		/**
		 * 服务器异常：Server exception
		 * 数据错误：Data error
		 * 网络错误：Network error
		 */
		if (error.message === 'Network Error') {
			console.log('Network Error');
		} else {
			console.log('Server exception');
		}

		return Promise.reject({});
	}
);

/**
 * @description 接口统一格式化处理接口数据
 * @params {String} method  请求方式
 * @params {String} url  请求地址
 * @params {Object} data  请求参数
 * @params {Object} headers  头部参数
 * @params {Object} option  其他备用参数
 */
export const formatRequest = async ({
	method = 'get',
	url = '',
	data = {},
	headers = {},
	option = {},
}) => {
	const useBaseUrl = 'https://game-server.omh-s2-demo.wephonecloud.com';
	const r = await instance({
		url: useBaseUrl + url,
		method,
		[['get', 'delete'].includes(method) ? 'params' : 'data']: data,
		headers,
		...option,
	});

	return r || {};
};
