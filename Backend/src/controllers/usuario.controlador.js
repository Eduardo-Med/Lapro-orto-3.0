/**
 * Controlador para el modelo de usuarios
 */
const pool = require("../models/database");
const encryptPassword = require("../helpers/EncryptPassword");
const bcrypt = require("bcrypt")
const fs = require("fs");



class UsuarioControlador {

  //Funcion para la obtencion de todos los usuarios de la base de datos
    async getUsuarios(req,res){
      try {
        var clientes = await pool.query("SELECT * FROM CLIENTE");
        clientes.shift();
        res.status("200").json({clientes});
      } catch (error) {
        res.status("204").json({message:"A ocurrido un error", error});
      }
    }

  //Funcion que busaca un usuario por su correo
    async getUsuarioByEmail(req, res){
      try {
        const cliente = await pool.query(`SELECT * FROM CLIENTE WHERE correo = '${req.userMail}'`);
        res.status(200).json({cliente});
      } catch (error) {
        res.status(400).json({message: "A ocurrido un error", error});
      }
    }

    //Funcion que agrega un usuario a la base de datos
    async createUsuario(req,res){
      try {
        const {nombre, apellidoPaterno, apellidoMaterno, direccion, telefono, correo, password} = req.body
        const newCliente = {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          direccion,
          telefono,
          correo,
          tipoUsuario:"Dentista",
          password: await encryptPassword(password),
          fotoPerfil: fs.readFileSync(
            "C:\\Users\\lalit\\Desktop\\lapro-orto-2.0\\Backend\\src\\public\\uploads\\logo.png"
          )
        };
        await pool.query("INSERT INTO CLIENTE set ?", [newCliente]);
        res.status(201).json({message: "Usuario agregado correctamente", usuario: newCliente});
      } catch (error) {
        res.status("400").json({code: error.code,message: error.sqlMessage});
      }
    }

    //Funcion para actualizar un usuario
    async updateUsuario(req,res){
      try {
        const {idCliente,nombre, apellidoPaterno, apellidoMaterno, direccion, telefono} = req.body
  
        await pool.query(`UPDATE CLIENTE set nombre = '${nombre}', apellidoPaterno = '${apellidoPaterno}', 
                                              apellidoMaterno = '${apellidoMaterno}', direccion = '${direccion}', 
                                              telefono = '${telefono}' WHERE idCliente = ${idCliente}`);
        res.status(201).json({message: "Usuario Actualizado Correctamente"})
      } catch (error) {
        res.status("400").json({code: error.code,message: error.sqlMessage});
      }
    }



    //Funcion para actualizar un usuario
    async cambiarContrasena(req,res){
      try {
        const {idCliente, password} = req.body
        var passwordEncrypt =  await encryptPassword(password)
        await pool.query(`UPDATE CLIENTE set password = '${passwordEncrypt}' WHERE idCliente = ${idCliente}`);
        console.log(password)
        res.status(201).json({message: "Contraseña Cambiada Correctamente"})
      } catch (error) {
        console.log(error)
        res.status("400").json({code: error.code,message: error.sqlMessage});
      }
    }

    //Funcion para eliminar usuario de la base de datos
    async deleteUsuario(req,res){
      try {
        await pool.query('DELETE FROM cliente WHERE idCliente = ?', [req.params.idUsuario]);
        res.status(200).json({message: "Usuario Eliminado"})
      } catch (error) {
          res.status(400).json({message: "A ocurrido un error", error})
      }
    }



}

module.exports = UsuarioControlador


