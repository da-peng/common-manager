import { ENCRYPTO_SECRET_KEY } from './Constants'
import CryptoJS from 'crypto-js'



/**
 *  操作local
 */
const encryptoLocalStorage = {
    setItem: (key: string, value: string) => {
        // CryptoJS.enc.Utf8.parse("1234123412ABCDEF")
        localStorage.setItem(key, CryptoJS.AES.encrypt(value, ENCRYPTO_SECRET_KEY).ciphertext)
        return 
    },
    getItem: (key: string) => {
        try {
            const text = localStorage.getItem(key)
            if (text) {
                const bytes = CryptoJS.AES.decrypt(text, ENCRYPTO_SECRET_KEY)
                const strText = bytes.toString(CryptoJS.enc.Utf8)
                return strText
            } else {
                return null
            }
        } catch (error) {
            localStorage.clear()
            return null
        }

    },
    removeItem: (key: string) => localStorage.removeItem(key)
}

export function getToken() {
    return encryptoLocalStorage.getItem('token')
}

export function setToken(token: string) {
    encryptoLocalStorage.setItem('token', token)
}

export function removeToken() {
    encryptoLocalStorage.removeItem('token')
    encryptoLocalStorage.removeItem('userinfo')
}

export function getUserinfo(): string {
    return encryptoLocalStorage.getItem('userinfo') || ''
}

export function setUserinfo(userinfo: string) {
    encryptoLocalStorage.setItem('userinfo', userinfo)
}