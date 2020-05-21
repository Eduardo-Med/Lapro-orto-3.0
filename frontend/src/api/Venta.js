import axios from 'axios'

const baseUrl = 'https://backend-lapro-orto.herokuapp.com/api/v1'


  export async function getVentas (){
    try{
      const response = await axios({
        url: `${baseUrl}/venta`,
        method: 'GET'
      })
      return response
    }catch(error){
        return error.response
    }
  }

  export async function addVentas (idOrden, precioTotal){

    try{
      const response = await axios({
        url: `${baseUrl}/venta`,
        method: 'POST',
        data:{
          idOrden,
          precioTotal
        },
      heders: {
        'content-type': 'multipart/form-data'
    }
      })
      return response
    }catch(error){
      return error.response
    }
  }


