import {  byte} from "@harmoniclabs/crypto";

export function toHexString(byteArray: byte[]): string {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}