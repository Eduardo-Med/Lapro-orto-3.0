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
  *Funcion para obtener los aparatos del servidor
  *
  */
  export async function getAparatos(){
    try{
      const response = await axios({
        url: `${baseUrl}/aparato`,
        method: 'GET'
      })
      return response
    }catch(error){
        return error.response
    }
  }

  /**
  *Funcion para agregar los aparatos al servidor
  * @param {Object} data Objecto que contiene la informacion del formulario
  *
  */
  export async function addAparatos (data){
    try{
      const response = await axios({
        url: `${baseUrl}/aparato`,
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
  *Funcion para solicitar eliminar un aparato al servidor
  * @param {Integer} id id del usuario a eliminar
  *
  */
  export async function deleteAparato (id){
    try{
      const response = await axios({
        url: `${baseUrl}/aparato/${id}`,
        method: 'DELETE'
      })
  
      return response
    }catch(error){
      return error
    }
  }

