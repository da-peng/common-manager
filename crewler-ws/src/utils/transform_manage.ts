import {Transform} from 'stream'
//使用管道来收集爬虫运行时的 记录，再websocket进行返回给前端
//https://blog.csdn.net/lzh5997/article/details/80529260
//https://www.npmjs.com/package/koa-websocket
export class CrewlerTransform{

    

    init(callBack):Transform{
        const statusStream = new Transform({
            // 读写流均开启对象模式
            writableObjectMode: true, 
            readableObjectMode: true,
        
            transform(chunk, encoding, callback) {
                callback(null, chunk)
            }
        });

        statusStream.setEncoding('utf-8');
        statusStream.on('data', callBack)
        return statusStream
    }
    
}


// 设置编码类型与回调
