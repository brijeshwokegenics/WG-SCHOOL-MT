//this file was created just to generate the hashed password for the owner which has been hardcoded in the mongodb
//using that id and password the owner can login without the signup process
//this file can be deleted later

const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  const password = "owner321"; // choose your owner password
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);
};

hashPassword();
