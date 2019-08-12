import {config} from '../config/config'

export class Log{

    private static log(level:string,msg:string){
        if(config.enabled){
            // 生产
            if(config.level in  ['info'] && level === config.level){
                console.log(new Date()+':'+level +':'+msg)
            }
            if(config.level in  ['debug'] && level === config.level){
                console.debug(new Date()+':'+level +':'+msg)
            }
            if(config.level in  ['warn'] && level === config.level){
                console.warn(new Date()+':'+level +':'+msg)
            }
            if(config.level in  ['error'] && level === config.level){
                console.error(new Date()+':'+level +':'+msg)
            }
            // 仅错误
            // if(config.level in  ['warn','error'] && level  in ['warn','error']){
            //     console.log(level +':'+msg)
            // }

        }
    }


    static  info(msg:string){
        this.log('info',msg)
    }
    static  debug(msg:string){
        this.log('debug',msg)
    }
    static  warn(msg:string){
        this.log('warn',msg)
    }
    static  error(msg:string){
        this.log('error',msg)
    }
}