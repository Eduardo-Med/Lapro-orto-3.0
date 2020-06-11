import axios from 'axios'

//const baseUrl = 'http://localhost:4000/api/v1'
const baseUrl = 'https://backend-lapro-orto.herokuapp.com/api/v1'

/**
 *Clase Usuario en donde se encuentran las peticiones al servidor del usuario
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */

  /**
  *Funcion para obtener todos los usuarios del servidor
  * @param {String} token token para saber si esta autentificado
  */
 export async function getUsers (token){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario`,
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
  *Funcion para obtener los usuarios por id
  * @param {Integer} id identificador del usuario
  * @param {String} token token para saber si esta autentificado
  */
 export async function getUsersById (id,token){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario/${id}`,
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
  *Funcion para agregar un usuario en el servidor
  * @param {Object} data objecto que contiene la informacion del formulario
  * @param {String} token token para saber si esta autentificado
  */
 export async function addUsers (data,token){
    const {nombre,apellidoPaterno,apellidoMaterno,direccion,telefono,correo,password} = data
    try{
      const response = await axios({
        url: `${baseUrl}/usuario`,
        method: 'POST',
        data: {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          direccion,
          telefono,
          correo,
          password
      },
      headers: {
        "Content-Type": 'application/json',
        "x-access-token":token
        
      }
      })
      return response
    }catch(error){
      return error.response
    }
  }

  /**
  *Funcion para actualizar un usuario
  * @param {Object} data objecto que contiene la informacion del formulario
  * @param {String} token token para saber si esta autentificado
  */
 export async function updateUser(data,token){

    try{
      const response = await axios({
        url: `${baseUrl}/usuario/${data.idCliente}`,
        method: 'PUT',
        data,
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


 export async function cambiarContrasena(data){

    try{
      const response = await axios({
        url: `${baseUrl}/usuario/contrasena/${data.idCliente}`,
        method: 'PUT',
        data,
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
  *Funcion para eliminar un usuario por su id
  * @param {Integer} id id del usuario a eliminar
  * @param {String} token token para saber si esta autentificado
  */
 export async function deleteUsers (id,token){
    try{
      const response = await axios({
        url: `${baseUrl}/usuario/${id}`,
        method: 'DELETE',
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