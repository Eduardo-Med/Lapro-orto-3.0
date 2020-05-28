
/*
Clase de controlador del aparato
En esta clase se encuentran las funciones que se utilizan
para manejar el modelo de aparatos
*/
const pool = require("../models/database");
const fs = require("fs");


class AparatoControlador{
  /* 
  Funcion para obtener todos los aparatos de la base de datos
  */

 async getAparatos(req, res){
    try {
      const aparatos = await pool.query("SELECT * FROM APARATO");
      res.status("200").json({aparatos});
    } catch (error) {
      res.status("204").json({message:"A ocurrido un error" , error});
    }
  }


  /* 
  Funcion para la creacion de un nuevo aparato
  */
  //se utiliza libreria fs para convertir la imagen al formato que entiende la bd
  async createAparato(req, res){
    try {
      const {descripcion} = req.body
      const {originalname, path } = req.file
      const newAparato = {titulo: originalname,descripcion,imagen: fs.readFileSync(path)};

      await pool.query("INSERT INTO APARATO set ?", [newAparato]);
      res.status(201).json({message: "Aparato agregado correctamente", aparato: newAparato});
    } catch (e) {
      console.log(e)
      res.status(400).json({code: e.code,message: e.sqlMessage});
    }
  }



  //Funcion para editar un aparato
  //se utiliza libreria fs para convertir la imagen al formato que entiende la bd
  async updateAparato(req, res){
      try {
          const {titulo, descripcion} = req.body
          const newAparato = {
            titulo,
            descripcion,
            imagen: fs.readFileSync(
              "C:\\Users\\lalit\\Desktop\\lapro-orto-2.0\\Backend\\src\\public\\uploads\\logo.png"
            )
          };
          await pool.query('UPDATE APARATO set ? WHERE idAparato = ?', [newAparato,req.params.idAparato]);
          res.status(201).json("Aparato Actualizado Correctamente")
      } catch (e) {
          res.status("400").json({code: e.code,message: e.sqlMessage});
      }

  }

  //Funcion para eliminar un aparato por su id
  async deleteAparato(req, res){
      try {
          await pool.query('DELETE FROM APARATO WHERE idAparato = ?', [req.params.idAparato]);
          res.status(200).json("Aparato Eliminado")
      } catch (error) {
          res.status(400).json({message:"A ocurrido un error", error})
      }

  }
}
module.exports = AparatoControlador;
