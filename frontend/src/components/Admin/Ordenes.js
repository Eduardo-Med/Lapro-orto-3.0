import React, {useState} from "react";
import * as Estado from "../../consts/estados";
import {addVentas} from "../../api/Venta";
import {notificacionActualizacionOrden} from "../../helpers/crearNotificaciones";
import {updateEstado} from "../../api/Orden";
import OrdenTarjeta from './TarjetaOrden'
import DetallaOrden from "../../components/DetallOrden";
import { AlertaEspera } from "../../helpers/AlertaEspera";



/**
 * Componente funcional que se utiliza para renderizar la tabla de las ordenes de trabajo
 * @constructor
 * 
 * 
 * @param {Object} ordenesPend objeto que contiene la informacion de las ordenes pendientes
 * @param {Object} ordenesProc objeto que contiene la informacion de las ordenes en proceso
 * @param {Object} ordenesT objeto que contiene la informacion de las ordenes Terminadas
 * @param {Object} ordenesC objeto que contiene la informacion de las ordenes pendientes
 * @param {Object} ordenesPag objeto que contiene la informacion de las ordenes pendientes
 * @param {Object} ordenesA objeto que contiene la informacion de las ordenes pendientes
 * @param {Object} usuario objeto que contiene la informacion de las ordenes pendientes
 * @returns Codigo HTML
 */
function Ordenes({ordenesPend,ordenesProc,ordenesT,ordenesC,ordenesPag,ordenesA,usuario}) {

  const [orden, setOrden] = useState();


  /**
   *Funcion que actuliza el estado de la orden
   *Si el estado de la orden es pagada se crea la venta en BD
   * @param {Integer} idOrden Identificador de la orden de trabajo
   * @param {Integer} estadoCambiado Estado de la orden al que se va cambiar
   * @param {Integer} precio Precio de la orden
   */
  async function cambiarEstado(idOrden, estadoCambiado,precio,idCliente) {
    if(estadoCambiado === Estado.ESTADO_ORDEN_PAGADA){
      await addVentas(idOrden,precio)
      await notificacionActualizacionOrden(idCliente,precio,estadoCambiado)
      window.location.reload(false);
    }
    const result = await updateEstado(idOrden, estadoCambiado);
    AlertaEspera(result.status)
    if(result.status === 201 ){
      await notificacionActualizacionOrden(idCliente,precio,estadoCambiado)  
      window.location.reload(false);
    }
    
  }
  

  /**
   *Funcion que obtiene los detalles de la orden apratir del index
   * @param {Integer} index Numero de la orden en el arreglo
   * @param {Integer} estado Numero de estado en el que esta la orden de trabajo
   */
  const obtenerDetallerOrden = (index,estado)=>{
    switch (estado) {
      case Estado.ESTADO_ORDEN_PENDIENTE:
        setOrden(ordenesPend[index])
        break;
      case Estado.ESTADO_ORDEN_ACEPTADA:
        setOrden(ordenesA[index])
        break;
      case Estado.ESTADO_ORDEN_PROCESO:
        setOrden(ordenesProc[index])
        break;
      case Estado.ESTADO_ORDEN_TERMINADA:
        setOrden(ordenesT[index])
        break;
      case Estado.ESTADO_ORDEN_PAGADA:
        setOrden(ordenesPag[index])
        break;
      case Estado.ESTADO_ORDEN_CANCELADA:
        setOrden(ordenesC[index])
        break;
      default:
        break;
    }
  }


  /**
   *Funcion que se utiliza para redenrizar las tarjetas de las ordenes
   * @param {Integer} estado Numero de estado en el que esta la orden de trabajo
   */
  function rendeOrdenes(estado) {
    if (estado === Estado.ESTADO_ORDEN_PENDIENTE) {
      return ordenesPend.length !== 0 ? (
        ordenesPend.map((orden, index) => (
          <div key={index}>
                <OrdenTarjeta index={index} obtenerDetallerOrden={obtenerDetallerOrden} orden={orden} tipoOrden={Estado.ESTADO_ORDEN_PENDIENTE} usuario={usuario} cambiarEstado={cambiarEstado}   />
          </div>
        ))
      ) : (
        <div><span className="textt">Vacio</span></div>
      );
    } else if (estado === Estado.ESTADO_ORDEN_ACEPTADA) {
      if(usuario === 'Dentista'){
        return ordenesA.length !== 0 ? (
          ordenesA.map((orden, index) => (
            <div key={index}>
                <OrdenTarjeta index={index} obtenerDetallerOrden={obtenerDetallerOrden} orden={orden} tipoOrden={Estado.ESTADO_ORDEN_ACEPTADA} usuario={'Dentista'} cambiarEstado={cambiarEstado}  />
            </div>
          ))
        ) : (
          <div><span className="textt">Vacio</span></div>
        );
      }else{
        return <div><span className="textt">Vacio</span></div>
      }
      
    } else if (estado === Estado.ESTADO_ORDEN_PROCESO) {
      return ordenesProc.length !== 0 ? (
        ordenesProc.map((orden, index) => (
          <div key={index}>
                <OrdenTarjeta index={index} obtenerDetallerOrden={obtenerDetallerOrden} orden={orden} tipoOrden={Estado.ESTADO_ORDEN_PROCESO} usuario={usuario} cambiarEstado={cambiarEstado}  />
          </div>
        ))
      ) : (
        <div><span className="textt">Vacio</span></div>
      );
    } else if (estado === Estado.ESTADO_ORDEN_TERMINADA) {
      return ordenesT.length !== 0 ? (
        ordenesT.map((orden, index) => (
          <div key={index}>
              <OrdenTarjeta index={index} obtenerDetallerOrden={obtenerDetallerOrden} orden={orden} tipoOrden={Estado.ESTADO_ORDEN_TERMINADA} usuario={usuario} cambiarEstado={cambiarEstado}  />
          </div>
        ))
      ) : (
        <div><span className="textt">Vacio</span></div>
      );
    } else if (estado === Estado.ESTADO_ORDEN_PAGADA) {
      return ordenesPag.length !== 0 ? (
        ordenesPag.map((orden, index) => (
          <div key={index}>
              <OrdenTarjeta index={index} obtenerDetallerOrden={obtenerDetallerOrden} orden={orden} tipoOrden={Estado.ESTADO_ORDEN_PAGADA} usuario={usuario} cambiarEstado={cambiarEstado}  />
          </div>
        ))
      ) : (
        <div><span className="textt">Vacio</span></div>
      );
    } else if (estado === Estado.ESTADO_ORDEN_CANCELADA) {
      return ordenesC.length !== 0 ? (
        ordenesC.map((orden, index) => (
          <div key={index}>
              <OrdenTarjeta index={index} obtenerDetallerOrden={obtenerDetallerOrden} orden={orden} tipoOrden={Estado.ESTADO_ORDEN_CANCELADA} usuario={usuario} cambiarEstado={cambiarEstado}  />
          </div>
        ))
      ) : (
        <div><span className="textt">Vacio</span></div>
      );
    }
  }

  return (
  <div className="container-fluid">
    <div className="row OrdenesTitulos">
      <h3 className="textt">Lista de Ordenes</h3>
    </div>
    <div className="row mt-5">
      <div className="col-md-2 col-sm-12 division bbbb ">
        <div className="text-white nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="text-white nav-link active" id="v-pills-pendientes-tab" data-toggle="pill" href="#v-pills-pendientes" role="tab" aria-controls="v-pills-pendientes" aria-selected="true">Pendientes</a>
          <a className="text-white nav-link" id="v-pills-aceptadas-tab" data-toggle="pill" href="#v-pills-aceptadas" role="tab" aria-controls="v-pills-aceptadas" aria-selected="false">Aceptadas</a>
          <a className="text-white nav-link" id="v-pills-proceso-tab" data-toggle="pill" href="#v-pills-proceso" role="tab" aria-controls="v-pills-proceso" aria-selected="false">Proceso</a>
          <a className="text-white nav-link" id="v-pills-terminadas-tab" data-toggle="pill" href="#v-pills-terminadas" role="tab" aria-controls="v-pills-terminadas" aria-selected="false">Terminadas</a>
          <a className="text-white nav-link" id="v-pills-pagadas-tab" data-toggle="pill" href="#v-pills-pagadas" role="tab" aria-controls="v-pills-pagadas" aria-selected="false">Pagadas</a>
          <a className="text-white nav-link" id="v-pills-canceladas-tab" data-toggle="pill" href="#v-pills-canceladas" role="tab" aria-controls="v-pills-canceladas" aria-selected="false">Canceladas</a>
        </div>
      </div>
      <div className="col-md-10 col-sm-12 division fondo2">
        <div className="tab-content" id="v-pills-tabContent">

          <div className="tab-pane fade show active" id="v-pills-pendientes" role="tabpanel" aria-labelledby="v-pills-pendientes-tab">
            <div className="container">
              {rendeOrdenes(0)}
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-aceptadas" role="tabpanel" aria-labelledby="v-pills-aceptadas-tab">
            <div className="container">
              {rendeOrdenes(1)}
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-proceso" role="tabpanel" aria-labelledby="v-pills-proceso-tab">
            <div className="container">
              {rendeOrdenes(2)}
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-terminadas" role="tabpanel" aria-labelledby="v-pills-terminadas-tab">
            <div className="container">
              {rendeOrdenes(3)}
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-pagadas" role="tabpanel" aria-labelledby="v-pills-pagadas-tab">
            <div className="container">
              {rendeOrdenes(4)}
            </div>
          </div>
          <div className="tab-pane fade" id="v-pills-canceladas" role="tabpanel" aria-labelledby="v-pills-canceladas-tab">
            <div className="container">
              {rendeOrdenes(5)}
            </div>
          </div>
        </div>
      </div>
    </div>

    {orden ? <DetallaOrden orden={orden} /> : null}
  </div>

  );
}



export default Ordenes
