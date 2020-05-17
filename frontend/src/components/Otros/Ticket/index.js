import React, {useState, useEffect} from "react";

import {getOrdenesTerminadas} from "../../../api/Orden";
import logo from "./logo.png";
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

  function renderTicket() {
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

return <div>{renderTicket()}</div>;
}

export default Ticket;
