//this file is just to test bcrypt password matching
//this file can be deleted later

const bcrypt = require("bcryptjs");

const plain = "owner321";
const hash = "$2b$10$qsL8UwMAEEhYMlhXAFj9cOAt6xrAw9KMcYJHuLsYJ5y2Ep0oH9JTm"; // your DB hash

const isMatch = bcrypt.compareSync(plain, hash);
console.log("Password match? ", isMatch);
