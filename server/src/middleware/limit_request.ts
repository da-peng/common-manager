/**
 * 限制并发中间件, 加入队列中（或者丢弃）
 */
/**带参数的中间件 */

export default function requestLimit(): (ctx: any, next: Function) => Promise<void> {
    let counter=0
    let queue = []
    return async (ctx, next) => {
        // 如果超过了最大并发数目
        if (counter >= 1) {
        // 如果当前队列中已经过长
            await new Promise((resolve, reject) => {
                queue.push(resolve);

            });
        }
        counter++;
        await next();
        counter--;
        queue.shift();
    }
}