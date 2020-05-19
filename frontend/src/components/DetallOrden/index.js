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
            <div id="main-container" class="container row">
        <div class="col col-left">
            <div>
                <h1>Nombre</h1>
                <p>{orden.nombreAparato}</p>
            </div>

            <div>
                <h1>Doctor</h1>
                <p>{orden.doctor}</p>
            </div>

            <div>
                <h1>Paciente</h1>
                <p>{orden.paciente}</p>
            </div>

            <div>
                <img id="imagen-orden"  src={`data:image/png;base64,${Buffer.from(orden.imagen).toString("base64")}`} alt="Card"/>
            </div>
        </div>

        <div class="col col-right">
            <div>
                <h1>Descripcion</h1> 
                <p>{orden.trabajoRealizar}</p>
            </div>
    
            <div>
                <h1>Clinica</h1>
                <p>{orden.clinica}</p>
            </div>
    
            <div>
                <h1>Fecha de salida</h1>
                <p>{orden.fechaSalida.substring(0, 10)}</p>
            </div>

            <div>
                <h1>Fecha de entrada</h1>
                <p>{orden.fechaEntrada.substring(0, 10)}</p>
            </div>

            <div>
                <h1>Color</h1>
                <p>{orden.color}</p>
            </div>

            <div>
                <h1>Material</h1>
                <p>{orden.material}</p>
            </div>

            <div>
                <h1>Observacion</h1>
                <p>{orden.observaciones}</p>
            </div>
        </div>
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