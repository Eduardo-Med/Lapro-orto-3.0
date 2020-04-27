import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

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