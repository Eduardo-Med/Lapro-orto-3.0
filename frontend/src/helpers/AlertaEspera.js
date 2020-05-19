import swal from 'sweetalert';


export function AlertaEspera(status){
    if(status === 200 || status === 201){
        swal("Cambiando Informacion", "Espere un momento porfavor", "info");
      }else{
        swal("A ocurrido un error", "Intentelo de nuevo mas tarde", "error");
      }
}
