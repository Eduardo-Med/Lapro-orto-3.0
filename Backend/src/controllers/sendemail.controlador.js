/**
* Controlador para enviar un correo electronico
*/
const nodemailer = require('nodemailer')


class SendEmail{
    //funcion para enviar un correo electronico
    async enviarCorreo(req, res){
    try {
        const {nameContactanos,correo,telefono,descripcion} = req.body
        console.log(process.env.CORREO)
        console.log(process.env.PASSWORD)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.CORREO,
                pass: process.env.PASSWORD
            }
        })
    
        const mailOptions = {
            from: "Equipo Lapro-Orto",
            to: `${correo}`,
            subject: "Enviado desde nodemailer",
            text: `Nombre: ${nameContactanos}  Telefono: ${telefono}   Descripcion: ${descripcion}`
        }
  
      transporter.sendMail(mailOptions, (error, info)=>{
          if(error){
              console.log(error)
              console.log(info)
              res.status(500).send(error.message);
          } else{
              console.log("Correo enviado correctamente")
              res.status(200).jsonp(req.body);
          }
      } )
  
      res.send('recivido')
    } catch (error) {
      res.status(500).json({message: 'A ocurrido un error con el envio del mensaje', error })
    }
  };
  
}


module.exports = SendEmail;
