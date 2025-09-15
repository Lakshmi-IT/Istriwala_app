// src/config.js
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.12.164:5000/"
    : "https://api.istriwala.org/";
