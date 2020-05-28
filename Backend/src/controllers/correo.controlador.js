/**
* Controlador para enviar un correo electronico
*/
const nodemailer = require('nodemailer')
const pool = require("../models/database");

class CorreoControlador{
  //funcion para enviar un correo electronico
  
  async correoConfirmacion(req, res){
    try {

        const user = await pool.query(`SELECT * FROM ClIENTE WHERE idCliente = 1`);
        const {nombre,correo,password} = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: user[0].correo,
                pass: user[0].contraCorreo
            }
        })
    
        const mailOptions = {
            from: "Equipo Lapro-Orto",
            to: `${correo}`,
            subject: "Enviado desde lapro-orto",
            html: `<div> 
                      <p>Gracias por registrarse en LAPRO-ORTO sr/sra ${nombre}</p> 
                      <p>Sus datos para ingresar a su cuenta son los siguientes: </p> 
                      <p><h1>Correo: </h1><span>${correo}</span></p> 
                      <p><h1>Contraseña: </h1><span>${password}</span></p> 
                      <p>Una vez ingresado en su cuenta favor de editar su perfil con sus datos personales</p> 
                   </div> `
        }
  
      transporter.sendMail(mailOptions, (error, info)=>{
          if(error){
              console.log(error.message)
              res.status(500).send(error.message);
          } else{
              res.status(200).jsonp(req.body);
          }
      } )
      console.log("mensaje enviado")
      res.send('recivido')
    } catch (error) {
        console.log(error.error)
      res.status(500).json({message: 'A ocurrido un error con el envio del mensaje', error })
    }
  }



  async enviarCorreo(req, res){
    try {
      const user = await pool.query(`SELECT * FROM ClIENTE WHERE idCliente = 1`);
      console.log(user)
        const {nameContactanos,correo,direccion,telefono,descripcion} = req.body
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
              user: user[0].correo,
              pass: user[0].contraCorreo
            }
        })
    
        const mailOptions = {
            from: `${nameContactanos}`,
            to: process.env.CORREO,
            subject: "Solicitud de cuenta",
            html: `<div> 
            <p>La siguiente persona esta soliciatando registrarse en la pagina: ${nameContactanos}</p> 
            <p>Sus datos son los siguientes: </p> 
            <p><h1>Nombre: </h1><span>${nameContactanos}</span></p> 
            <p><h1>Correo: </h1><span>${correo}</span></p> 
            <p><h1>Direccion: </h1><span>${direccion}</span></p> 
            <p><h1>Telefono: </h1><span>${telefono}</span></p> 
            <p><h1>Mas informacion: </h1><span>${descripcion}</span></p> 
         </div> `
        }
  
      transporter.sendMail(mailOptions, (error, info)=>{
          if(error){
              res.status(500).send(error.message);
          } else{
              res.status(200).jsonp(req.body);
          }
      } )
      console.log("enviado")
      res.send('recivido')
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'A ocurrido un error con el envio del mensaje', error })
    }
  }
  
}


module.exports = CorreoControlador;
