import delay from '@/utils/delay';
export default async function() {
    try {
        // 异步等待1000ms
        await delay(1000);
        //  成功时获取数据
        if (Math.random() < 0.5) {
            return [
                { id: 1, name: '小米', stock: 50 },
                { id: 2, name: '华为', stock: 60 },
                { id: 3, name: '苹果', stock: 80 },
            ];
        }
        // 失败时抛出错误
        throw new Error('not Found');
    } catch (e) {
        // 向上抛出错误，交给上一级处理
        throw e;
    }
}
