import CryptoJS from 'crypto-js';
import { trim } from './tools';

// 秘钥
const keyHex: any = CryptoJS.enc.Utf8.parse('xe3vk9tFTMjxvxFwE6Lk7yf0pFU08T6V');

/**
 * @description AES 加密
 * @param {string} data
 * @returns {any}
 */
function encryptByDES(data: string) {
  const encrypted: any = CryptoJS.AES.encrypt(trim(data), keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * @description AES 解密
 * @param {any} ciphertext
 * @returns {any}
 */
function decryptByDES(ciphertext: any): string {
  const decrypted: any = CryptoJS.AES.decrypt(ciphertext, keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encryptByDES, decryptByDES };