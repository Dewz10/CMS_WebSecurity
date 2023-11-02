import CryptoJS from "crypto-js";

const encrypt = (text) => {
  const passphrase = "123";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
const decrypt = (ciphertext) => {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export {encrypt, decrypt}