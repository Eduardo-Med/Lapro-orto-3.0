import {crearNotificacion} from '../api/Notificacion'
import * as Estado from '../consts/estados'
export function notificacionNuevaOrden(){
    const data={
        idCliente:1,
        detalles:"Se a creado una nueva orden de trabajo",
        enlace:'www.google.com'
    }

    crearNotificacion(data)
}


export function notificacionActualizacionOrden(idCliente,precio,estado){
    let data,data2;
    switch (estado) {
        case Estado.ESTADO_ORDEN_PENDIENTE:
         data={
            idCliente,
            detalles:`Una orde de trabajo esta pendiente favor de revisar`,
            enlace:'www.google.com'
        }
          break;
        case Estado.ESTADO_ORDEN_ACEPTADA:
         data={
            idCliente,
            detalles:`La orden de tranbajo a sido aceptada con un precio de $${precio} favor de revisar`,
            enlace:'www.google.com'
        }
          break;
        case Estado.ESTADO_ORDEN_PROCESO:
         data={
            idCliente,
            detalles:"La orden de trabajo esta en proceso favor de revisar",
            enlace:'www.google.com'
        }
        data2={
            idCliente:1,
            detalles:"Una orden de trabajo fue aceptada favor de revisar",
            enlace:'www.google.com'
        }
          break;
        case Estado.ESTADO_ORDEN_TERMINADA:
         data={
            idCliente,
            detalles:"La orden de trabajo esta finalizada favor de revisar",
            enlace:'www.google.com'
        }
          break;
        case Estado.ESTADO_ORDEN_PAGADA:
             data={
                idCliente,
                detalles:"La orden de trabajo se marco como pagada",
                enlace:'www.google.com'
            }
          break;
        case Estado.ESTADO_ORDEN_CANCELADA:
             data={
                idCliente,
                detalles:"La orden de trabajo a sido cancelada",
                enlace:'www.google.com'
            }
          break;
        default:
          break;
      }
    crearNotificacion(data)
    if(estado === Estado.ESTADO_ORDEN_PROCESO){
        crearNotificacion(data2)
    }
}