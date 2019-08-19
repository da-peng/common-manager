import * as uuid from 'uuid';
import * as crypto from 'crypto';

export class StringUtil{

    static unitConvertToInt=(i:string)=>{
        if (i.match(/万/)){
            return parseInt(i.replace('万',''))*10000
        }else if(i.match(/亿/)){
            return parseInt(i.replace('亿',''))*10000*1000*1000
        }else if(i.match(/千万/)){
            return parseInt(i.replace('千万',''))*10000*1000
        }
        return parseInt(i)
    }

}