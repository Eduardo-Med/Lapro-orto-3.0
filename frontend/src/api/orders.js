import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL


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