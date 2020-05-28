import React, { useState, useEffect } from "react";
import "./styles.css";
import {getOrdenesTerminadas} from  "../../../api/Orden";
import { useCookies } from 'react-cookie';
import VentanaCargaInformacion from "../../Otros/VentanaCargaInformacion";
import Imagen from '../../../images/sin-imagen.png'


/**
 * 
 * Componente funcional que renderiza la vista de ventas
 *@constructor
 *
 * @returns Codigo HTML
 */
function Ventas() {
  const [ordenesTerminadas, setOrdenesTerminadas] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [cookies] = useCookies(['cookie-name']);
  


  useEffect(() => {
      
  /**
   *Funcion que obtiene las ordenes terminadas del servidor
   *
   */
    async function loadOrdenes() {
      const responseOrdenes = await getOrdenesTerminadas(cookies.userId);
      if (responseOrdenes.status === 200) {
        setOrdenesTerminadas(responseOrdenes.data.ordenes[0]);
        setPrecioTotal(responseOrdenes.data.total);
        console.log(responseOrdenes.data.ordenes[0].length)
        setisLoading(false);
      }
    }
    loadOrdenes();
  }, [cookies]);


  const renderBotonEnviar=()=>{
        return (
          <button className="boton" onClick={()=>window.location.href = "/dentista/ticket/imprimir"}>Ir A Imprimir Recibo</button>
        )
  }
  

  function renderOrdenesTerminadas() {
    if (!isLoading) {
      if(ordenesTerminadas.length !== 0){
      return (
        <div className="items-list mb-5">
          {ordenesTerminadas.map((orden, index) => (
            <div key={index} className="row mb-5 item-container ">
              <div className="container">
                <div className="row ">
                  <div className="col-lg-4 col-xs-12  col-sm-12 col-md-12">
                     <div className="item-image-container producto-image">
                       {orden.imagen ? 
                       <img
                       className="producto-image"
                       src={`data:image/png;base64,${Buffer.from(
                         orden.imagen
                       ).toString("base64")}`}
                       alt="productos"
                     />
                     :
                     <img className="card-img-top h-100" src={Imagen} alt="Card" />
                       }
                        
                      </div>
                  </div>
                  <div className="col-lg-8 col-xs-12  col-sm-12  col-md-12">
                     <div class="container">
                          <div className="row">
                           <div className="item-info-container">
                             <h3>Nombre del producto</h3>
                             <p>{orden.nombreAparato}</p>
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
            {renderBotonEnviar()}
          </div>
        </div>
      );
    
    
    }else{
      return (<h1 className="ml-5">No cuenta con ordenes terminadas</h1>)
    }
    
    
    } else {
      return <VentanaCargaInformacion/>;
    }
  }


  

  return <div className="container">{renderOrdenesTerminadas()}</div>;
}

export default Ventas;
