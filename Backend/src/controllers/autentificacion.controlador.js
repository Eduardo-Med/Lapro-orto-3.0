/**
 * Clase de para la autentificacion del usuario
 */
const pool = require("../models/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



class AutentificacionControlador {
//Funcion para que el usuario pueda iniciar seccion
   async loginUser (req, res){
    try {
      const { mail, password } = req.body;
      //Verificar si el usuario existe
      const user = await pool.query(`SELECT * FROM ClIENTE WHERE correo = "${mail}"`);
      if (!user[0]) {
        return res.status(404).json({auth:false, message:"The email doesn't exists"});
      }
      //Verificar si la contraseña coincida con la contraseña de la base de datos
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        return res.status(401).json({ auth: false, message:"Contraseña incorrecta", token: null });
      }
    
      //Crea un token que expira cada hora
      const token = jwt.sign({ id: user[0].idCliente, mail }, process.env.SECRETTOKEN, {
        expiresIn: "60min"
      });
    
      res.status(200).json({ auth: true, message:"Autentificacion correcta", token, userId: user[0].idCliente, tipoUsuario: user[0].tipoUsuario });
    } catch (error) {
      res.json({message: "A ocurrido un error", error})
    }
  };
}

module.exports = AutentificacionControlador;
