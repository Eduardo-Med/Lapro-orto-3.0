import React, {useState} from "react";
import * as Estado from "../../consts/estados";
import {addPrecio} from '../../api/orders'

function TarjetaOrden({orden, tipoOrden,usuario, cambiarEstado, obtenerDetallerOrden, index}) {
  const [datosForm, setDatosForm] = useState({});
  const [idPendiente, setIdPendiente] = useState("");
  
  const handleInputChange = (event) => {
      event.persist();
      setDatosForm({...datosForm, [event.target.name]: event.target.value});
  }


  async function agregarPrecio(id,precio){
    await addPrecio(id,precio)
    cambiarEstado(id, Estado.ESTADO_ORDEN_ACEPTADA)
    window.location.reload(false);
  }


  function renderOpciones(){
        if(tipoOrden === Estado.ESTADO_ORDEN_PENDIENTE){
            if(usuario === 'Admin'){
                return(
                    <div className="card-body">
                        <button style={{marginRight: '78px'}} onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_CANCELADA)} className="btn btn-danger">Cancelar</button>
                        <button className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal" onClick={()=>setIdPendiente(orden.idOrden)} >Aceptar</button>
                    </div>
                )
            }else{
                return(
                    <div className="card-body">
                        <button style={{marginLeft: '80px'}} onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_CANCELADA)} className="btn btn-danger">Cancelar</button>
                    </div>
                )
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_ACEPTADA){
            if(usuario === 'Dentista'){
                return(
                    <div className="card-body">
                        <button style={{marginRight: '78px'}} onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_CANCELADA)} className="btn btn-danger">Cancelar</button>
                        <button onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_PROCESO)} className="btn btn-primary">Aceptar</button>
                    </div>
                )
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_PROCESO){
            if(usuario === 'Admin'){
                return(
                    <div className="card-body">
                        <button style={{marginLeft: '80px'}}  onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_TERMINADA)} className="btn btn-primary">Terminar</button>
                    </div>
                )
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_TERMINADA){
            if(usuario === 'Admin'){
                return (
                <div className="card-body">
                        <button style={{marginLeft: '80px'}}  onClick={()=>cambiarEstado(orden.idOrden, Estado.ESTADO_ORDEN_PAGADA, orden.precio)} className="btn btn-primary">Pagada</button>
                </div>
                )
            }else{
                return(<div></div>)
            }
        }else if(tipoOrden === Estado.ESTADO_ORDEN_PAGADA || tipoOrden === Estado.ESTADO_ORDEN_CANCELADA ){
            if(usuario === 'Admin'){
                return(<div></div>)
            }else{
                return(<div></div>)
            }
        }
  }

  return (


    <div className="card float-left mr-1 my-5" style={{width: '18rem'}}>
      <div style={{height: '35vh', width: '100%'}}>
      <img className="card-img-top h-100" src={`data:image/png;base64,${Buffer.from(orden.imagen).toString("base64")}`} alt="Card" />
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
      
  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <button type="button" className="btn btn-primary" onClick={()=>agregarPrecio(idPendiente,datosForm.precio)}>Aceptar</button>
      </div>
    </div>
  </div>
</div>


        {renderOpciones()}
        
    </div>
  );
}

export default TarjetaOrden;
