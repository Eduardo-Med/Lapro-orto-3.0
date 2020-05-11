
/*
Clase de controlador del aparato
En esta clase se encuentran las funciones que se utilizan
para manejar el modelo de aparatos
*/
const pool = require("../models/database");
var now= new Date();


class NotifiacionControlador{
    async getNotificacion(req,res){
        try {
          const notificacion = await pool.query(`SELECT * FROM NOTIFICACION WHERE idCliente = ${req.params.idUsuario} AND visto = false`);
          res.status("200").json({notificacion});
        } catch (error) {
          res.status("204").json({message:"A ocurrido un error" , error});
        }
    }

    async crearNotificacion(req, res){
        try {
          const {detalles,enlace,idCliente} = req.body
          const newNotificacion = {
              detalles,
              enlace,
              visto: false,
              fecha: now,
              idCliente
          };
          await pool.query("INSERT INTO NOTIFICACION set ?", [newNotificacion]);
          res.status(201).json({message: "Notificacion realizada correctamente", notificacion: newNotificacion});
        } catch (e) {
          res.status(400).json({code: e.code,message: e.sqlMessage});
        }
      };

      async actualizarNotificacion(req, res){
        try {
            await pool.query(`UPDATE NOTIFICACION SET visto = 1 WHERE idNotificacion = ${req.params.idNotificacion}`);
            res.status(201).json("Notificacion Actualizado Correctamente")
        } catch (e) {
            res.status("400").json({code: e.code,message: e.sqlMessage});
        }
  
    }


}


module.exports = NotifiacionControlador;
