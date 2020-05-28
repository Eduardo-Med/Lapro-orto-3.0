import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/v1'
//const baseUrl = 'https://backend-lapro-orto.herokuapp.com/api/v1'

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
      return error.response
    }
  }
  export async function enviarCorreoConfirmacion(data){

    try{
      const response = await axios({
        url: `${baseUrl}/sendemail/registro`,
        method: 'POST',
        data,
      heders: {
        'content-type': 'multipart/form-data'
    }
      })
      return response
    }catch(error){
      return error.response
    }
  }
