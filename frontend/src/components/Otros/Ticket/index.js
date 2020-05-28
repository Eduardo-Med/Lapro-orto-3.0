import React, {useState, useEffect} from "react";

import {getOrdenesTerminadas} from "../../../api/Orden";
import logo from "./logo.png";
import {renderToString} from 'react-dom/server'
import jsPDF from 'jspdf'
import Pagina from '../PlantillaPagina'
import "./styles.css";



/**
 *Componente funcional que renderiza el ticket de las ordenes del cliente
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */

function Ticket({usuario}) {
  const today = new Date();
  const [ordenesTerminadas, setOrdenesTerminadas] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [cargaBoton, setCargaBoton] = useState(false);
  const [mensaje] = useState('PDF Descargado correctamente');

  useEffect(() => {
    /**
    *Funcion que carga la informacion del las orden terminadas
    *
    */
    async function loadOrdenes() {
      const responseOrdenes = await getOrdenesTerminadas(usuario.userId);
      if (responseOrdenes.status === 200) {
        setOrdenesTerminadas(responseOrdenes.data.ordenes[0]);
        setPrecioTotal(responseOrdenes.data.total);
        setisLoading(false);
      }
    }

    loadOrdenes();
  }, [usuario]);



  const Prints = () => (
    <div className="container border p-3">
    <div className="container mb-3">

        <div className="row mb-3">
            <div className="col" style={{float: 'left'}}>
                <h3>Cliente: </h3>
                <p>{ordenesTerminadas[0].nombre} {ordenesTerminadas[0].apellidoPaterno} {ordenesTerminadas[0].apellidoMaterno}</p>
            </div>


            <div className="col">
                <h3>Numero de recibo: </h3>
                <p>#56448123</p>
            </div>


            <div>
            <h3>Fecha: </h3>
                      {`${today.getDate()}. ${
                        today.getMonth() + 1
                      }. ${today.getFullYear()}.`}
            </div>

            <br/>
        </div>

        <div className="row">
            <div className="col">
                <h3>Tecnico: </h3>
                <p>Guillermo Flores Hernandez</p>
            </div>
        </div>
    </div>

    <div>

        <table class="table">
            <thead>
                <tr>
                    <th class="bg-light" scope="col">Ordenes</th>
                    <th class="bg-light" scope="col">Precio</th>
                </tr>
            </thead>

            <tbody>
            {
                ordenesTerminadas.map((orden, index)=>(
                    <tr className="item" key={index}>
                    <td>{orden.trabajoRealizar}:</td>
                    <td>${orden.precio}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    <h1 className="justify-center">Total: ${precioTotal}</h1>
</div>
  )

  const print = () => {
    setCargaBoton(true)
    const string = renderToString(<Prints />);
    const pdf = new jsPDF('p', 'pt', 'letter');
    pdf.fromHTML(string,40,0,{'width': 1150});
    pdf.save('Ticket')
  }



  const renderBotonEnviar=()=>{
    if(!cargaBoton){
        return (
          <button className="boton" onClick={()=>print()}>Imprimir recibo</button>
        )
    }
    return(
        <div class="alert alert-info" role="alert">
              {mensaje}
        </div>
    )
  }

  const renderTicket = () => {
    if (!isLoading) {
      return (
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tr className="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td className="title">
                      <img
                        src={logo}
                        style={{ width: "100%", maxWidth: "156px" }}
                        alt="logo"
                      />{" "}
                    </td>
                    <td>
                      Fecha:{" "}
                      {`${today.getDate()}. ${
                        today.getMonth() + 1
                      }. ${today.getFullYear()}.`}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>Cliente: {ordenesTerminadas[0].nombre} {ordenesTerminadas[0].apellidoPaterno} {ordenesTerminadas[0].apellidoMaterno}</td>
                    <td>Numero de recibo: #56448123</td>
                  </tr>
                  <tr>
                    <td>Tecnico: Guillermo Flores Hernandez</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="heading">
              <td>Ordenes:</td>
              <td>Precio</td>
            </tr>
            {
                ordenesTerminadas.map((orden, index)=>(
                    <tr className="item" key={index}>
                    <td>{orden.trabajoRealizar}:</td>
                    <td>${orden.precio}</td>
                    </tr>
                ))
            }
          </table>
          <br />
          <h1 className="justify-center">Total: ${precioTotal}</h1>
        </div>
      );
    }
  }

return <Pagina contenido={[
        <div>{renderTicket()}
          <div className="botones-salida">
            {renderBotonEnviar()}
          </div>
        </div>
        ]}
        >
</Pagina> 
}

export default Ticket;
