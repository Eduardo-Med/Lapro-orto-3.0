import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL


/**
 *Clase SendEmail en donde se encuentran la peticion para enviar correo
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
  
  /**
  *Funcion para enviar
  * @param {Object} objecto que contiene la informacion del formulario
  */
  export async function enviarCorreo(data){

    try{
      const response = await axios({
        url: `${baseUrl}/sendemail`,
        method: 'POST',
        data,
      heders: {
        'content-type': 'multipart/form-data'
    }
      })
      return response
    }catch(error){
      console.log(error.response)
    }
  }
