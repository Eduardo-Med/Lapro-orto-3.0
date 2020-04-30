import React, { useState, useEffect } from "react";
import "./styles.css";
import { getOrdenesTerminadas } from "../../../api/orders";
import {crearPDF} from '../../../api/ticket'
import { useCookies } from 'react-cookie';

function Ventas() {
  const [ordenesTerminadas, setOrdenesTerminadas] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [cookies] = useCookies(['cookie-name']);
  
  useEffect(() => {
    async function loadOrdenes() {
      const responseOrdenes = await getOrdenesTerminadas(cookies.userId);
      if (responseOrdenes.status === 200) {
        setOrdenesTerminadas(responseOrdenes.data.ordenes[0]);
        setPrecioTotal(responseOrdenes.data.total);
        setisLoading(false);
      }
    }
    loadOrdenes();
  }, [cookies]);
  

  function renderOrdenesTerminadas() {
    if (!isLoading) {
      return (
        <div className="items-list">
          {ordenesTerminadas.map((orden, index) => (
            <div className="row mb-5 item-container ">
              <div className="container">
                <div className="row ">
                  <div className="col-lg-4 col-xs-12  col-sm-12 col-md-12">
                     <div className="item-image-container producto-image">
                        <img
                          className="producto-image"
                          src={`data:image/png;base64,${Buffer.from(
                            orden.imagen
                          ).toString("base64")}`}
                          alt="productos"
                        />
                      </div>
                  </div>
                  <div className="col-lg-8 col-xs-12  col-sm-12  col-md-12">
                     <div class="container">
                          <div className="row">
                           <div className="item-info-container">
                             <h3>Nombre del producto</h3>
                             <p>{orden.trabajoRealizar}</p>
                           </div>
                          </div>
                          <div className="row">
                            <div className="item-info-container">
                               <h3>Descripción</h3>
                               <p>{orden.trabajoRealizar}</p>
                            </div>
                          </div>
                          <div className="row d-flex flex-row-reverse">
                            <div className="item-info-container">
                                 <div className="precio-contenedor">
                                   <p className="precio">
                                      <strong>${orden.precio}</strong>
                                   </p>
                                 </div>
                            </div>
                          </div>
                     </div>
                  </div>
                </div>

              </div>
            </div>
            



          ))}


          <h1>Precio Total: ${precioTotal}</h1>
          <div className="botones-salida">
            <button className="boton" onClick={()=>crearPDF()}>Imprimir recibo</button>
          </div>
        </div>
      );
    } else {
      return <div>cargando...</div>;
    }
  }


  

  return <div className="container">{renderOrdenesTerminadas()}</div>;
}

export default Ventas;
