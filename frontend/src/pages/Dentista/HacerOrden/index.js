import React from "react";
import NuevaOrden from '../../../components/Dentista/NuevaOrden'
import {addOrdenes} from "../../../api/Orden";
import Plantilla from "../../../components/Otros/PlantillaPagina"
import { useCookies } from 'react-cookie';
import { accessControlDentisa } from "../../../helpers/accessControlDentisa";
import { notificacionNuevaOrden } from "../../../helpers/crearNotificaciones";


/**
 *Componente funcional que renderiza la pagina en la que se realiza la orden
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function HacerOrden(){
  const [cookies] = useCookies(['cookie-name']);

   /**
   *Funcion para enviar la informacion del formulario de la orden al servidor
   *
   * @param {Object} datos Objecto que contiene la informacion del formulario
   * @param {Object} datosImagen Objecto que contiene la informacion de la imagen que se agrega en el formulario
   */
  async function enviarDatosFormulario(datos,datosImagen){
    const formData = new FormData();
    formData.append('imagen',datosImagen.imagen);
    formData.append('clinica', datos.clinica);
    formData.append('paciente', datos.paciente);
    formData.append('fechaSalida', datos.fechaSalida);
    formData.append('doctor', datos.doctor);
    formData.append('fechaEntrada', datos.fechaEntrada);
    formData.append('nombreAparato', datos.nombreAparato);
    formData.append('trabajoRealizar', datos.trabajoRealizar);
    formData.append('color', datos.color);
    formData.append('material', datos.material);
    formData.append('observaciones', datos.observaciones);
    formData.append('idCliente', cookies.userId);
    const rest = await addOrdenes(formData,cookies.token)
    notificacionNuevaOrden()
    window.location.reload(false);
    console.log(rest)
  }

  return (
    <Plantilla contenido={[
        <NuevaOrden enviar={enviarDatosFormulario}/>
    ]}></Plantilla>
  );
};

export default accessControlDentisa(HacerOrden)