import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL



/**
 *Clase Aparato en donde se encuentran las peticiones al servidor
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */


  /**
  *Funcion para obtener las notificacion del servidor
  *
  */
  export async function getNotificacion(idUsuario){
    try{
      const response = await axios({
        url: `${baseUrl}/notificacion/usuario/${idUsuario}`,
        method: 'GET'
      })
      return response
    }catch(error){
        return error.response
    }
  }

  /**
  *Funcion para agregar las notificaciones al servidor
  * @param {Object} data Objecto que contiene la informacion del formulario
  *
  */
  export async function crearNotificacion(data){
    try{
      const response = await axios({
        url: `${baseUrl}/notificacion`,
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

/**
  *Funcion para poner la notificacion en vista
  * @param {Object} data objecto que contiene la informacion de la notificacion
  */
  export async function actualizarNotificacion(idNotificacion){

    try{
      const response = await axios({
        url: `${baseUrl}/notificacion/${idNotificacion}`,
        method: 'PUT',
      })
      return response
    }catch(error){
      return error.response
    }
  }
