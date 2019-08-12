import * as uuid from 'uuid';
import * as crypto from 'crypto';
import {config} from '../config/config'

export class StringUtil{

    private static md5(str: string): string {
        return crypto.createHash('md5').update(str).digest('hex');
    }

    static md5Password(password: string): string {
        return config.encryptPassword ? this.md5(password) : password;
    }

    static encrypt(str: string): string {
        const cipher = crypto.createCipher('aes-256-cbc',config.encryptKey);
        let rst = cipher.update(str, 'utf8', 'base64');
        rst += cipher.final('base64');
        return rst;
    }

    static decrypt(str: string): string {
        const decipher = crypto.createDecipher('aes-256-cbc', config.encryptKey);
        let rst = decipher.update(str, 'base64', 'utf8');
        rst += decipher.final('utf8');
        return rst;
    }


}