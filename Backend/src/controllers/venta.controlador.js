const pool = require("../models/database");
let now= new Date();

class VentaControlador{

  async getVentas(req, res){
    try {
      const ventas = await pool.query("SELECT * FROM VENTA");
      res.status("200").json({ventas});
    } catch (error) {
      res.status("400").json({message: "A ocurrido un error",error});
    }
  };
  
  
  
  async createVenta(req, res){
    try {
      const {precioTotal, idOrden} = req.body
      const newVenta = {
        precioTotal,
        fechaVenta: now,
        idOrden,
      };
      await pool.query("INSERT INTO VENTA set ?", [newVenta]);
      res.status(201).json({Info: "Aparato agregado correctamente", Venta: newVenta});
    } catch (e) {
      res.status("400").json({code: e.code,message: e.sqlMessage});
    }
  };
}



module.exports = VentaControlador;
