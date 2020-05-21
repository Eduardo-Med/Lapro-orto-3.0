import React, {useState} from "react";
import * as Estado from "../../consts/estados";
import {addPrecio,deleteOrdenes} from "../../api/Orden";
import {AlertaEspera} from '../../helpers/AlertaEspera';
import { useCookies } from "react-cookie";
import Imagen from '../../images/sin-imagen.png'

 
/**
 *Componente funcional que renderiza una tarjeta con la informacion de la orden
 *
 * @constructor
 * 
 * @param {Object} orden Objecto que contiene la informacion de la orden a mostrar en la tarjeta
 * @param {Integer} tipoOrden Variable que contiene el tipo de la orden
 * @param {Object} usuario Objecto que contiene la informacion del usuario
 * @param {Function} cambiarEstado Funcion que se utiliza para cambiar el estado de la orden
 * @param {Function} obtenerDetallerOrden Funcion que se utiliza pra obtener la informacion de la orden
 * @returns Codigo HTML
 */
function TarjetaOrden({orden, tipoOrden,usuario, cambiarEstado, obtenerDetallerOrden, index}) {
  const [datosForm, setDatosForm] = useState({});
  const [idPendiente, setIdPendiente] = useState("");
  const [cookies] = useCookies(["cookie-name"]);
  const handleInputChange = (event) => {
      event.persist();
      setDatosForm({...datosForm, [event.target.name]: event.target.value});
  }

  /**
   *Funcion para agregar el preacion a la orden
   *
   * @param {Integer} id id de la orden
   * @param {Integer} precio precio de la orden
   */
  async function agregarPrecio(id,precio,idCliente){
    const result = await addPrecio(id,precio) 
    AlertaEspera(result.status)
    if(result.status === 201 || result.status === 200){
      cambiarEstado(id, Estado.ESTADO_ORDEN_ACEPTADA,precio,idCliente)
      window.location.reload(false);
    }
  }

  async function EliminarOrden(idOrden){
    const result = await deleteOrdenes(idOrden,cookies.token)
    AlertaEspera(result.status)
    window.location.reload(false)
  }


  function renderOpciones(){
        if(tipoOrden === Estado.ESTADO_ORDEN_PENDIENTE){
            if(usuario === 'Admin'){
                return(
                    <div className="card-body">
                        <button style={{marginRight: '78px'}} onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_CANCELADA,0,orden.idCliente)} className="btn btn-danger">Cancelar</button>
                        <button className="btn btn-primary"  data-toggle="modal" data-target={`#exampleModal${orden.idOrden}`} onClick={()=>setIdPendiente(orden.idOrden)} >Aceptar</button>
                    </div>
                )
            }else{
                return(
                    <div className="card-body">
                        <button style={{marginLeft: '80px'}} onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_CANCELADA,0,orden.idCliente)} className="btn btn-danger">Cancelar</button>
                    </div>
                )
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_ACEPTADA){
            if(usuario === 'Dentista'){
                return(
                    <div className="card-body">
                        <button style={{marginRight: '78px'}} onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_CANCELADA,0,orden.idCliente)} className="btn btn-danger">Cancelar</button>
                        <button onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_PROCESO,0,orden.idCliente)} className="btn btn-primary">Aceptar</button>
                    </div>
                )
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_PROCESO){
            if(usuario === 'Admin'){
                return(
                    <div className="card-body">
                        <button style={{marginLeft: '80px'}}  onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_TERMINADA,0,orden.idCliente)} className="btn btn-primary">Terminar</button>
                    </div>
                )
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_TERMINADA){
            if(usuario === 'Admin'){
                return (
                <div className="card-body">
                        <button style={{marginLeft: '80px'}}  onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_PAGADA, orden.precio,orden.idCliente)} className="btn btn-primary">Pagada</button>
                </div>
                )
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_PAGADA){
            if(usuario === 'Admin'){
                return(<div></div>)
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_CANCELADA){
          if(usuario === 'Admin'){
            return(<div></div>)
          }else{
            return(
              <div className="card-body">
                      <button style={{marginLeft: '80px'}}  onClick={()=>EliminarOrden(orden.idOrden)} className="btn btn-danger">Eliminar</button>
              </div>
              )
        }
        }
  }

  return (


    <div className="card float-left mr-1 my-5" style={{width: '18rem'}}>
      <div style={{height: '35vh', width: '100%'}}>
        {
          !orden.imagen ?
          <img className="card-img-top h-100" src={Imagen} alt="Card" />
          :
          <img className="card-img-top h-100" src={`data:image/png;base64,${Buffer.from(orden.imagen).toString("base64")}`} alt="Card" />
        }
      
      </div>
      
      <div className="card-body">
        <h5 className="card-title">{orden.nombreAparato}</h5>
        <p className="card-text">
          {orden.trabajoRealizar}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Solicitada: {orden.nombre} {orden.apellidoPaterno}</li>
        <li className="list-group-item">Fecha: {orden.fechaEntrada.substr(0,10)}</li>
        <li className="list-group-item">Precio: ${orden.precio}</li>
        <li className="list-group-item">Detalles: <button className="btn btn-primary" data-toggle="modal" data-target="#ModalDetalles" onClick={()=>obtenerDetallerOrden(index,tipoOrden)}>Ver</button> </li>
      </ul>
      
  <div className="modal fade" id={`exampleModal${orden.idOrden}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModal${orden.idOrden}Label`} aria-hidden="true">
  <div className="modal-dialog backgroudncolormodal" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Agregar Precio</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
            <input type="text" className="form-control" name="precio" onChange={handleInputChange}/>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={()=>agregarPrecio(idPendiente,datosForm.precio,orden.idCliente)}>Aceptar</button>
      </div>
    </div>
  </div>
</div>


        {renderOpciones()}
        
    </div>
  );
}

export default TarjetaOrden;
