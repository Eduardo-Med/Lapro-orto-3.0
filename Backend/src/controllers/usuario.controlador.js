/**
 * Controlador para el modelo de usuarios
 */
const usuarioCtrl = {};
const pool = require("../models/database");
const encryptPassword = require("../helpers/EncryptPassword");
const fs = require("fs");


//Funcion para la obtencion de todos los usuarios de la base de datos
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    let clientes = await pool.query("SELECT * FROM CLIENTE");
    clientes.shift();
    res.status("200").send({clientes});
  } catch (error) {
    res.status("204").send({message:"A ocurrido un error", error});
  }
};

usuarioCtrl.getUsuarioByEmail = async (req, res) => {
    try {
      const cliente = await pool.query(`SELECT * FROM CLIENTE WHERE correo = '${req.userMail}'`);
      res.status(200).json({cliente});
    } catch (error) {
      res.status(400).json({message: "A ocurrido un error", error});
    }
  };


//Funcion para la creacion de un usuario en la base de datos
usuarioCtrl.createUsuario = async (req, res) => {
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
    console.log("Cliente Agregado Correctamente")
  } catch (error) {
    res.status("400").json({code: error.code,message: error.sqlMessage});
  }
};

//Funcion para la actualizacion de un usuario por su iden la base de datos
usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        const {idCliente,nombre, apellidoPaterno, apellidoMaterno, direccion, telefono, correo, password} = req.body
        const newCliente = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            direccion,
            telefono,
            correo,
            password: await encryptPassword(password),
            fotoPerfil: fs.readFileSync(
              "C:\\Users\\lalit\\Desktop\\lapro-orto-2.0\\Backend\\src\\public\\uploads\\logo.png"
            )
        };
        await pool.query('UPDATE CLIENTE set ? WHERE idCliente = ?', [newCliente,idCliente]);
        res.status(201).json({message: "Usuario Actualizado Correctamente"})
    } catch (error) {
        res.status("400").json({code: error.code,message: error.sqlMessage});
    }
    
}

//Funcion para eliminar un usuario por su id
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await pool.query('DELETE FROM cliente WHERE idCliente = ?', [req.params.id]);
        res.status(200).json("Usuario Eliminado")
    } catch (error) {
        res.status(400).json({message: "A ocurrido un error", error})
    }

 }
module.exports = usuarioCtrl;
