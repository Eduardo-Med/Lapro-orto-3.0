import React from "react"


export function mensajeRespuesta(respuesta,mensaje,activo){
    
    if(activo){
        
        if(respuesta.status === 200){
            return (
                <div class="alert alert-warning" role="alert">
                  <p>  {mensaje} Enviado Correctamente.</p>
                  <p>El administrador le mandara un mensaje a su correo con su informacion correspondiente </p>
                  <p>si desea realizar otra accion recargue la pagina  </p>
                </div>
            )
        }else{
            return(
                
                <div class="alert alert-danger" role="alert">
                    Algo salio mal!!! Intentelo de nuevo mas tarde
                </div>
            )
        }
    }
}