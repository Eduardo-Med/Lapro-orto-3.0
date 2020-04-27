const ticketCtrl = {};
const puppeteer = require('puppeteer');
const fs = require('fs')

ticketCtrl.crearPDF= async (req, res) => {
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
    console.log("ticket creado")
  } catch (error) {
    res.status(400).json({message: 'A ocurrido un error con la impresion', error})
  }

};







module.exports = ticketCtrl;
