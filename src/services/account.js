import { formatRequest } from '../config/http.interceptor';
/**
 * @description 登录接口
 * @param {string} username
 * @param {string} password
 */
export async function loginApi(params) {
	// return axios.post('/game/user/login', params);
	return formatRequest({
		method: 'post',
		url: '/game/user/login',
		data: params,
	});
}
/**
 *@description 查询用户信息
 */
export async function getUserInfoApi() {
	return formatRequest({
		method: 'get',
		url: '/game/user/get-user-info',
	});
}
/**
 *@description 获取用户资产
 */
export async function getAssetsInfoApi() {
	return formatRequest({
		method: 'get',
		url: '/game/user-assets/get-assets-info',
	});
}
