import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL


export async function iniciarSesion (data){
    const {correo,password} = data
    console.log(data)
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
