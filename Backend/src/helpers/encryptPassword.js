
const bcrypt = require("bcrypt");

async function encryptPassword (password){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}


module.exports = encryptPassword