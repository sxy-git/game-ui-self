/**
 * @description 防抖
 * @param {Function} fn
 * @param {number} time
 */
export const shakeFn = (fn, time) => {
	let timeId = null;
	return function () {
		if (timeId) {
			clearTimeout(timeId);
		}
		timeId = setTimeout(() => {
			fn();
		}, time);
	};
};
/**
 * @description 节流
 * @param {Function} fn
 * @param {number} time
 */
export const throttle = (fn, time) => {
	let timeId = null;
	return function () {
		if (!timeId) {
			timeId = setTimeout(() => {
				fn();
				timeId = null;
			}, time);
		}
	};
};
