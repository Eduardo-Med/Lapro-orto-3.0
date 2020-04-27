import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL


export async function getAparatos (){
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
      console.log(error.response)
    }
  }


  export async function deleteAparato (id){
    try{
      const response = await axios({
        url: `${baseUrl}/aparato/${id}`,
        method: 'DELETE'
      })
  
      return response
    }catch(error){
      console.log(error)
    }
  }