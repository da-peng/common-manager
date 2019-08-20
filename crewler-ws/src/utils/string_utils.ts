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
        }else if(i.match(/,/)){
            let l = i.split(',')
            let s = []
            for (let index = 0; index < l.length; index++) {
                const j = l[index];
                s.push(parseInt(j)*1000*(l.length-index))
            }//?
            return parseInt(s.join(''))
        }
        return parseInt(i)
    }

    static timeFormat=(time:string)=>{
        let createTime = new Date()
        if (time.match(/前/)) {//今天
            createTime = new Date()
        } else if(time.match(/昨天/)){//昨天
            createTime = new Date()
            createTime.setDate(createTime.getDate() - 1)
        }else {
            let n = (time.split('-')).length - 1
            if (n === 1) {//今年
                time = (new Date().getFullYear()).toString() + '-' + time
            }
            createTime = new Date(time)
        }
        return createTime
    }

}