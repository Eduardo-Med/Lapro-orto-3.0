const ordenCtrl = {};
const pool = require("../models/database");
const fs = require('fs')


ordenCtrl.getOrden = async (req,res) => {
    try {
        const ordenes = await pool.query("call sp_ordenByEstadoAndCliente()");
        res.status("200").json({ordenes});
      } catch (error) {
        res.status("204").json({message: "a ocurrido un error", error});
      }
}

ordenCtrl.getOrdenById = async (req,res) => {
    try {
        const {idOrden} = req.params
        const ordenes = await pool.query(`call sp_ordenByCliente(${idOrden})`)
        res.status("200").json({ordenes});
    } catch (error) {
        res.status("404").json({message: "a ocurrido un error", error});
    }

}

ordenCtrl.getOrdenTerminadaById = async (req,res) => {
    try {
        const {idUsuario} = req.params
        let total = 0
        const ordenes = await pool.query(`call sp_ordenByClienteAndOrdenTerminada(${idUsuario})`)
        for (let index = 0; index < ordenes[0].length; index++) {
            total += ordenes[0][index].precio;
        }
        res.status("200").json({ordenes, total});
    } catch (error) {
        res.status("404").json({message: "a ocurrido un error", error});
    }

}



ordenCtrl.createOrden = async (req,res) => {
    try {
        const {path } = req.file
        const {clinica, paciente, fechaSalida,doctor,fechaEntrada,trabajoRealizar,color,material,observaciones,nombreAparato,idCliente} = req.body
        const newOrden = {
            clinica, 
            paciente, 
            fechaSalida,
            doctor,
            fechaEntrada,
            nombreAparato,
            trabajoRealizar,
            color,
            material,
            imagen: fs.readFileSync(path),
            observaciones,
            estado: 0,
            idCliente
        }
      await pool.query("INSERT INTO ORDEN set ?", [newOrden]);
      res.status(201).json({message: "Aparato agregado correctamente", Orden: newOrden});
    } catch (e) {
      res.status(400).json({code: e.code,message: e.sqlMessage});
      }
} 

ordenCtrl.updateOrden = async (req,res) => {
    try {
        const {idOrden,estado} = req.params
        await pool.query(`UPDATE ORDEN SET estado = ${estado} WHERE (idOrden = ${idOrden})`);
        res.status(201).json({message: "Orden Actualizada Correctamente"})
    } catch (error) {
        console.log(error)
        res.status("400").json({code: error.code,message: error.sqlMessage});
    }   
}

ordenCtrl.addPrecio = async (req,res) => {
    try {
        
        await pool.query(`UPDATE laprorto.orden SET precio = ${req.params.precio} WHERE (idOrden = ${req.params.idOrden})`);
        res.status(200).json({message: 'Precio Agregado'})
    } catch (error) {
        res.status(400).json({"message": "A ocurrido un error",error})
    }
} 


ordenCtrl.deleteOrden = async (req,res) => {
    try {
        await pool.query('DELETE FROM ORDEN WHERE idOrden = ?', [req.params.idOrden]);
        res.status(200).json("Orden Eliminada")
    } catch (error) {
        res.status(400).json({message: "a ocurrido un error", error})
    }
} 

module.exports = ordenCtrl