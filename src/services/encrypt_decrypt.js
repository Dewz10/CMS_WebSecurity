import CryptoJS from "crypto-js";

const encrypt = (text) => {
  const passphrase = "test";
  if (text === null) {
    text = "null";
  } else if (
    typeof text === "number" ||
    text instanceof Date ||
    typeof text === "boolean"
  ) {
    text = text.toString();
  }
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
const decrypt = (ciphertext) => {
  const passphrase = "test";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export { encrypt, decrypt };
