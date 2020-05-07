import React from 'react'
import './styles.css'



/**
 *Componente funcional que renderiza la ventana de informacion de la orden
 *
 * @constructor
 * 
 * @param {Function} editar funcion que se utiliza para la edicion del usuario
 * @param {Object} usuario Objecto que contiene la informacion del usuario
 * @returns Codigo HTML
 */
function DetallaOrden({orden}) {
    return (
        <div className="modal fade" id="ModalDetalles" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-centered modalContenedor" role="document">
          <div className=" modal-content modalDetalle" style={{backgroundColor: 'white'}}>
            <div className="modal-header headermodal">
              <div className="container">
                  <div className="row">
                      <div className="col-12">
                      <h5 className="modal-title" id="exampleModalLongTitle">Orden de: <span>{orden.nombre}</span></h5>
                      </div>
                  </div>
              </div>
            </div>
            <div class="modal-body fondoModal">
              <div className="container">
                  <div className="row">
                      <div className="col-sm-12 col-md-4">
                      <img className="card-img-top h-100" src={`data:image/png;base64,${Buffer.from(orden.imagen).toString("base64")}`} alt="Card" />
                      </div>
                      <div className="col-sm-12 col-md-8">
                          <div className="container">
                              <div className="row my-3"><h6>Nombre: &nbsp; </h6><span>  {orden.nombreAparato}</span></div>
                              <div className="row my-3"><h6>&nbsp;&nbsp;Doctor:&nbsp;&nbsp;</h6><span>  {orden.doctor}</span></div>
                              <div className="row my-3"><h6>Paciente: &nbsp;</h6><span> {orden.paciente}</span></div>
                          </div>
                      </div>
                  </div>
                  <div className="row my-3"><h6>Descripcion:&nbsp;&nbsp;&nbsp;</h6><span>{orden.trabajoRealizar}</span></div>
                  <div className="row my-3"><h6>Clinica:&nbsp;&nbsp;&nbsp;</h6><span>{orden.clinica}</span></div>
                  <div className="row my-3"><h6>Fecha de Salida:&nbsp;&nbsp;&nbsp;</h6><span>{orden.fechaSalida}</span></div>
                  <div className="row my-3"><h6>Fecha de Entrada:&nbsp;&nbsp;&nbsp;</h6><span>{orden.fechaEntrada}</span></div>
                  <div className="row my-3"><h6>Color:&nbsp;&nbsp;&nbsp;</h6><span>{orden.color}</span></div>
                  <div className="row my-3"><h6>Material:&nbsp;&nbsp;&nbsp;</h6><span>{orden.material}</span></div>
                  <div className="row my-3"><h6>Observacion:&nbsp;&nbsp;&nbsp;</h6><span>{orden.observaciones}</span></div>
              </div>
            </div>
            <div class="modal-footer headermodal">
              <button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default DetallaOrden
