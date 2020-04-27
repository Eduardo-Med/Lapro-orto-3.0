const authCtrl = {};
const pool = require("../models/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


authCtrl.loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await pool.query(`SELECT * FROM ClIENTE WHERE correo = "${mail}"`);
    if (!user[0]) {
      return res.status(404).json({auth:false, message:"The email doesn't exists"});
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ auth: false, message:"Contraseña incorrecta", token: null });
    }
    const token = jwt.sign({ id: user[0].idCliente, mail }, process.env.SECRETTOKEN, {
      expiresIn: "60min"
    });
    res.status(200).json({ auth: true, message:"Autentificacion correcta", token, userId: user[0].idCliente, tipoUsuario: user[0].tipoUsuario });
  } catch (error) {
    res.json({message: "A ocurrido un error", error})
  }
 
};
module.exports = authCtrl;
