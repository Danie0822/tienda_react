// src/utilis/sha256.js
import CryptoJS from 'crypto-js';

export function calculateAndLogSha256(input) {
  try {
    const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    return hash;
  } catch (error) {
    throw error; // Manejo del error según tus necesidades
  }
}
