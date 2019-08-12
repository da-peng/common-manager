import {config} from '../config/config'
export class Message {

    static en = require('../locales/en.json');

    static zh = require('../locales/zh.json');

    static get(id: string) {
        return (this[config.appLanguage])[id];
    }
}