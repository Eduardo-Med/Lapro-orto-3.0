/**
 * Clase para la impresion de la pantalla en PDF
 */
const puppeteer = require('puppeteer');
const fs = require('fs')

class TicketControlador{
  //Funcion para imprimir pdf de la pagina seleccionada
  async crearPDF(req, res){
    try {
      const browser = await puppeteer.launch();
      const page =  await browser.newPage()
      const options = {
        path: `${__dirname}/result.pdf`,
        format: 'A4'
      };
    
      await page.goto('http://localhost:3000/dentista/ticket/imprimir', {waitUntil: 'networkidle2'})
      await page.pdf(options);
      await browser.close()
      res.sendFile(`${__dirname}/result.pdf`)
      setTimeout(function(){ fs.unlinkSync(`${__dirname}/result.pdf`); }, 3600);
    } catch (error) {
      res.status(400).json({message: 'A ocurrido un error con la impresion', error})
    }
  };
}


module.exports = TicketControlador;
