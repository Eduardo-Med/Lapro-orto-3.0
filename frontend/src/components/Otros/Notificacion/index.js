import React from 'react'
import {obtenerMes} from '../../../helpers/obtenerMes'
import {actualizarNotificacion} from '../../../api/Notificacion'
import { useCookies } from 'react-cookie';

import './styles.css'

function Notificacion({listaNotificacion}) {
  const [cookies] = useCookies(['cookie-name']);

    const actualizar=async(id,iduser)=>{
      const response = await actualizarNotificacion(id)
      if(response.status === 200 || response.status === 201){
        if(cookies.tipoUsuario === "Admin"){
          window.location.href = "/admin/ordenes"
        }else{
          window.location.href = `/${iduser}/perfil`
        }
      }
      
    } 
    return (
        <div className="dropdown-menu dropdown-menu-right rounded-0 pt-0 notificacion" aria-labelledby="notifications">
        <div className="list-group">
          <div className="lg">
            {listaNotificacion.map((notificacion,index)=>(
                  <div key={index} className="list-group-item list-group-item-action flex-column align-items-start" onClick={()=>actualizar(notificacion.idNotificacion, notificacion.idCliente)}>
                    <h5 className="mb-1">{notificacion.detalles}</h5>
                    <p className="mb-0">Fecha:  {notificacion.fecha.substr(8,2)} de {obtenerMes(notificacion.fecha.substr(5,2))} de {notificacion.fecha.substr(0,4)}</p>
                </div>
            ))}
          </div> 
        </div> 
      </div> 
    )
}

export default Notificacion
