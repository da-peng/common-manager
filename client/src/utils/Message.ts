export interface ResponseMessage {
    message:string
    status:number
}
export class Message{

    static en = require('../utils/locales/en.json');

    static zh = require('../utils/locales/zh.json');

    static get(id: string):ResponseMessage{
        // const appLanguage = process.env.appLanguage|| 'en'
        return (this['zh'])[id];
    }
}