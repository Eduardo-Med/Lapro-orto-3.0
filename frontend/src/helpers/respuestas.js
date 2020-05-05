import React from "react"


export function mensajeRespuesta(respuesta,mensaje,activo){
    
    if(activo){
        
        if(respuesta.status === 200){
            console.log(respuesta)
            return (
                <div class="alert alert-warning" role="alert">
                    {mensaje} Enviado Correctamente si desea realizar otra accion recargue la pagina
                </div>
            )
        }else{
            console.log(respuesta)
            return(
                
                <div class="alert alert-danger" role="alert">
                    Algo salio mal!!! Intentelo de nuevo mas tarde
                </div>
            )
        }
    }
}