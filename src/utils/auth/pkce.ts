import { Buffer } from "buffer";
import CryptoJS from "crypto-js";

export function createPKCEChallenge() {
  const codeVerifier = generateRandomString(128);

  // Create the code challenge by hashing the code verifier and base64-url encoding the result
  const codeChallenge = base64UrlEncode(wordArrayToArrayBuffer(CryptoJS.SHA256(codeVerifier)));

  return {
    codeVerifier,
    codeChallenge,
  };
}

function generateRandomString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";

  // Add random characters to the string until it reaches the desired length
  for (let i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return str;
}

function base64UrlEncode(str: ArrayBuffer) {
  return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function wordArrayToArrayBuffer(wordArray: CryptoJS.lib.WordArray): ArrayBuffer {
  // Convert the WordArray to a hex string
  const hexString = CryptoJS.enc.Hex.stringify(wordArray);

  // Create a new Uint8Array with the same length as the hex string
  const uint8Array = new Uint8Array(hexString.length / 2);

  // Iterate over the hex string and set the values of the Uint8Array
  for (let i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }

  // Get the ArrayBuffer from the Uint8Array
  return uint8Array.buffer;
}
