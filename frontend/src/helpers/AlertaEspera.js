import swal from 'sweetalert';


export function AlertaEspera(status){
    if(status === 200 || status === 201){
        swal("Cambiando Informacion", "Espere un momento porfavor", "info");
      }else{
        swal("A ocurrido un error", "Intentelo de nuevo mas tarde", "error");
      }
}


export function AlertaConfirmacion(status,mensaje){
  if(status === 200 || status === 201){
      swal(mensaje, "Espere un momento porfavor", "info");
    }else if(status === 500){
      swal("Archivo No Valido", "Intentelo de nuevo", "error");
    }else{
      swal("A ocurrido un error", "Intentelo de nuevo mas tarde o revise la informacion", "error");
    }
}


