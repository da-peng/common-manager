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
            } else{
                return ''
            }
        } catch (error) {
            localStorage.clear()
            return ''
        }

    },
    removeItem: (key: string) => localStorage.removeItem(key)
}

export function getToken() {
    return localStorage.getItem('token') as any
}

export function setToken(token: string) {
    localStorage.setItem('token', token)
}

export  function setUid(uid: string) {
    localStorage.setItem('uid', uid)
}

export function getUid() {
    return  parseInt(localStorage.getItem('uid') as any)
}

export function removeToken() {
    encryptoLocalStorage.removeItem('token')
    encryptoLocalStorage.removeItem('uid')
}
