import Cookies from 'js-cookie';

/**
 * 将数据存入 Web Storage
 *
 * @param {string} key 作为 Storage 的 Key
 * @param {Object} value 传入的数据
 * @returns {boolean} 是否设置成功的状态
 */
export function setStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));

		return true;
	} catch (err) {
		return false;
	}
}

/**
 * 将 Web Storage 中的某条数据删除
 *
 * @param {string} key 作为 Storage 的 Key
 * @returns {boolean} 是否设置成功的状态
 */
export function delStorage(key) {
	try {
		localStorage.removeItem(key);

		return true;
	} catch (err) {
		console.error(err);
	}

	return false;
}

/**
 * 从 Web Storage 获取数据
 *
 * @param {string} key 作为 Storage 的 Key
 * @returns {Object} 与 key 对应的数据
 */
export function getStorage(key) {
	try {
		const value = localStorage.getItem(key);
		if (value === null || value === '') {
			return '';
		}
		return JSON.parse(value);
	} catch (err) {
		// console.error(err);
		return {};
	}
}

/**
 * @description cookie
 */
export function getCookieValue(key) {
	const isJson = () => {
		try {
			JSON.parse(Cookies.get(key));
			return true;
		} catch (e) {
			return false;
		}
	};
	if (Cookies.get(key) && isJson()) {
		return JSON.parse(Cookies.get(key));
	} else {
		return Cookies.get(key);
	}
}

export function setCookieValue(key, val, iDay) {
	const oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);

	return Cookies.set(key, JSON.stringify(val), { expires: oDate });
}

export function removeCookieValue(key) {
	return Cookies.remove(key);
}
