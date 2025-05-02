import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const encryptToBytes = (secretKey: string, text: string): string => {
  const encrypted = CryptoJS.AES.encrypt(text, String(secretKey)).toString();
  return encrypted;
};

export const decryptFromBytes = (
  secretKey: string,
  bytes: string | Uint8Array
): string => {
  let base64String: string;

  if (typeof bytes === "string" && bytes.startsWith("0x")) {
    const cleanHex = bytes.slice(2);
    const byteArray = new Uint8Array(
      cleanHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16))
    );
    base64String = new TextDecoder().decode(byteArray);
  } else if (bytes instanceof Uint8Array) {
    base64String = new TextDecoder().decode(bytes);
  } else {
    throw new Error("Unsupported input type for decryption");
  }

  const decrypted = CryptoJS.AES.decrypt(base64String, String(secretKey));
  return decrypted.toString(CryptoJS.enc.Utf8);
};
