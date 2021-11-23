// 常用场景：滚动事件、窗口尺寸改变事件
// 不断触发，不断清除定时器，最后一次后多少毫秒触发

export default function (func, duration) {
    let timer = null; // 记录定时器
    return new Proxy(func, {
        /**
         *
         * @param {*} proxyTarget 代理对象
         * @param {*} thisArg 指向this指向
         * @param {*} listArgs 传递的参数列表，数组
         */
        apply(proxyTarget, thisArg, listArgs) {
            clearTimeout(timer); // 清除之前计时，重新开始计时
            timer = setTimeout(() => {
                Reflect.apply(proxyTarget, thisArg, listArgs);
            }, duration);
        },
    });
}
