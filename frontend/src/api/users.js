import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

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
      console.log(error)
      return error.response
    }
  }


  
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
      console.log(error)
      return error.response
    }
  }

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
      console.log(error)
      return error.response
    }
  }
  