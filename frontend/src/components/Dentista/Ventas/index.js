import React, { useState, useEffect } from "react";
import "./styles.css";
import {getOrdenesTerminadas} from  "../../../api/Orden";
import {crearPDF} from  "../../../api/Ticket";
import { useCookies } from 'react-cookie';
import VentanaCargaInformacion from "../../Otros/VentanaCargaInformacion";


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
  const [cargaBoton, setCargaBoton] = useState(false);
  const [mensaje, setMensaje] = useState('Espere un momento, descargando PDF');
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
        setisLoading(false);
      }
    }
    loadOrdenes();
  }, [cookies]);

  const imprimirPDF = async ()=>{
    setCargaBoton(true)
    var result = await crearPDF();

    if(result.status === 200){  
      setMensaje('PDF Descargado correctamente')
    }else{
      setMensaje('A ocurrido un error al descargar el PDF')
    }

  }

  const renderBotonEnviar=()=>{
    if(!cargaBoton){
        return (
          <button className="boton" onClick={()=>imprimirPDF()}>Imprimir recibo</button>
        )
    }
    return(
        <div class="alert alert-info" role="alert">
              {mensaje}
        </div>
    )
  }
  

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
    } else {
      return <VentanaCargaInformacion/>;
    }
  }


  

  return <div className="container">{renderOrdenesTerminadas()}</div>;
}

export default Ventas;
