// 节流，在指定时间内只能做一件事

export default function (func, duration) {
    let startTime = 0; // 开始时间
    return new Proxy(func, {
        apply(target, thisArg, listArgs) {
            const endTime = +new Date();
            if (endTime - startTime >= duration) {
                Reflect.apply(target, thisArg, listArgs);
                startTime = endTime;
            }
        },
    });
}
