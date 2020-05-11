import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

/**
 *Clase Autentificacion en donde se encuentran las peticiones al servidor
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */

  /**
  *Funcion para iniciar sesion
  * @param {Object} data Objecto que contiene la informacion del formulario de iniciar sesion
  *
  */
   export async function iniciarSesion (data){
    const {correo,password} = data
    try{
      const response = await axios({
        url: `${baseUrl}/authenticate/login`,
        method: 'POST',
        data: {
          mail: correo,
          password
      },
      })
      return response
    }catch(error){
      return error.response
      
    }
  }

