import axios from 'axios'
import { saveAs } from 'file-saver';

const baseUrl = 'https://backend-lapro-orto.herokuapp.com/api/v1'


export async function crearPDF(){
    try{
      const response = await axios({
        url: `${baseUrl}/ticket`,
        method: 'GET',
        responseType: 'blob',
      })

      const pdfBlob = new Blob([response.data], {type: 'application/pdf'})
      saveAs(pdfBlob, 'ticketPago.pdf')
      
      return response
    }catch(error){
      return error.response
    }
  }