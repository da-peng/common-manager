import * as uuid from 'uuid';
import * as crypto from 'crypto';

export class StringUtil{

    static unitConvertToInt=(i:string)=>{
        if (i.match(/万/)){
            return parseInt(i.replace('万',''))*10000
        }
        return parseInt(i)
    }

}