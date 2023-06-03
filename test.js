const {
  randomBytes
} = require('crypto');

const uid = Math.random().toString(36).slice(2) + randomBytes(8).toString('hex') + new Date().getTime();

console.log(uid)