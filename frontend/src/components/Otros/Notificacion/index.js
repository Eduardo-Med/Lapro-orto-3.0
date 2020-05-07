import React from 'react'
import {obtenerMes} from '../../../helpers/obtenerMes'
import {actualizarNotificacion} from '../../../api/Notificacion'
import './styles.css'

function Notificacion({listaNotificacion}) {
    return (
        <div className="dropdown-menu dropdown-menu-right rounded-0 pt-0 notificacion" aria-labelledby="notifications">
        <div className="list-group">
          <div className="lg">
            {listaNotificacion.map((notificacion,index)=>(
                  <a href="perfil" className="list-group-item list-group-item-action flex-column align-items-start" onClick={()=>actualizarNotificacion(notificacion.idNotificacion)}>
                    <h5 className="mb-1">{notificacion.detalles}</h5>
                    <p className="mb-0">Fecha:  {notificacion.fecha.substr(8,2)} de {obtenerMes(notificacion.fecha.substr(5,2))} de {notificacion.fecha.substr(0,4)}</p>
                </a>
            ))}
          </div> 
        </div> 
      </div> 
    )
}

export default Notificacion
