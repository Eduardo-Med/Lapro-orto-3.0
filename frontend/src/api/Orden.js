import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

/**
 *Clase Orden en donde se encuentran las peticiones al servidor
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */

  /**
  *Funcion para obtener las ordenes del servidor
  *
  */
  export async function getOrdenes (token){
    try{
      const response = await axios({
        url: `${baseUrl}/orden`,
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "x-access-token": token
          
        }
      })
      return response
    }catch(error){
        return error.response
    }
  }

  /**
  *Obtener las ordenes por id
  * @param {Integer} id identificador de la orden al buscar
  * @param {String} token token para saber si esta autentificado
  *
  */
  export async function getOrdenesById(id, token){
    try{
      const response = await axios({
        url: `${baseUrl}/orden/${id}`,
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "x-access-token": token
          
        }
      })
      return response
     
    }catch(error){
        return error.response
    }
  }


  /**
  *Funcion para agregar ordenes al servidor
  * @param {Object} data objeto que tiene la informacion de la orden
  * @param {String} token token para saber si esta autentificado
  *
  */
  export async function addOrdenes (imagen,token){

    try{
      const response = await axios({
        url: `${baseUrl}/orden`,
        method: 'POST',
        data: imagen,
      heders: {
        'content-type': 'multipart/form-data',
        "x-access-token": token
    }
      })
      return response
    }catch(error){
      console.log(error.response)
    }
  }

  /**
  *Obtener las ordenes terminadas por su id
  * @param {Integer} idUser identificador del usuario para buscar la orden terminada
  *
  */
  export async function getOrdenesTerminadas (idUser){
    try{
      const response = await axios({
        url: `${baseUrl}/orden/terminada/${idUser}`,
        method: 'GET'
      })
      return response
    }catch(error){
        console.log(error.response)
        return error.response
    }
  }


  /**
  *Funcion para solicitar actualizar el estado de la orden
  * @param {Integer} idOrden identificador de la orden al buscar
  * @param {Integer} estado estado al que se cambia la orden de trabajo
  * @param {String}  token token para saber si esta autentificado
  *
  */
  export async function updateEstado(idOrden,estado,token){

    try{
      const response = await axios({
        url: `${baseUrl}/orden/${idOrden}/${estado}`,
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json',
          "x-access-token": token
          
        }
      })
      return response
    }catch(error){
      return error.response
    }
  }

  /**
  *Funcion para agregar precion a la orden de trabajo
  * @param {Integer} idOrden identificador de la orden al buscar
  * @param {Integer} precio precio que se le va agregar a la orden
  *
  */
  export async function addPrecio(idOrden,precio){

    try{
      const response = await axios({
        url: `${baseUrl}/orden/cambiarPrecio/${idOrden}/${precio}`,
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json',
          
        }
      })
      return response
    }catch(error){
      return error.response
    }
  }

  /**
  *Funcion para solicitar eliminar una orden por su id
  * @param {Integer} id identificador de la orden al buscar
  * @param {String} token token para saber si esta autentificado
  *
  */
  export async function deleteOrdenes (id,token){
    try{
      const response = await axios({
        url: `${baseUrl}/orden/${id}`,
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          "x-access-token": token
          
        }
      })
  
      return response
    }catch(error){
      console.log(error)
    }
  }


