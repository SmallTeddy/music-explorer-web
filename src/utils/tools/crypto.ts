import CryptoJS from 'crypto-js'
import { trim } from './index'

// 秘钥
const keyHex: any = CryptoJS.enc.Utf8.parse('xe3vk9tFTMjxvxFwE6Lk7yf0pFU08T6V')

/**
 * @description AES 加密
 * @param {string} data
 * @returns {any}
 */
function encryptByDES(encryptText: string): string {
  const encrypted: any = CryptoJS.AES.encrypt(trim(encryptText), keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

/**
 * @description AES 解密
 * @param {any} decryptText
 * @returns {any}
 */
function decryptByDES(decryptText: string): string {
  const decrypted: any = CryptoJS.AES.decrypt(decryptText, keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export { encryptByDES, decryptByDES }
