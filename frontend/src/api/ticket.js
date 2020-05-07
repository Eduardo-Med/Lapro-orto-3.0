import axios from 'axios'
import { saveAs } from 'file-saver';

const baseUrl = process.env.REACT_APP_BASE_URL


export async function crearPDF(){
    try{
      console.log()
      const response = await axios({
        url: `${baseUrl}/ticket`,
        method: 'GET',
        responseType: 'blob',
      })

      const pdfBlob = new Blob([response.data], {type: 'application/pdf'})
      saveAs(pdfBlob, 'ticketPago.pdf')
      
      return response
    }catch(error){
      console.log(error.response)
    }
  }