import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

import Plantilla from "../../../components/Otros/PlantillaPagina"
import InfoPerfil from "../../../components/Dentista/InfoPerfil";
import EditarPerfil from "../../../components/Dentista/EditarPerfil";
import OrdenesFiltradas from "../../../components/Admin/Ordenes";
import './styles.css';
import {getUsersById, updateUser} from "../../../api/Usuario";
import {getOrdenesById} from "../../../api/Orden";
import { accessControlDentisaAdmin } from "../../../helpers/accessControlDentisa";
import {AlertaConfirmacion} from '../../../helpers/AlertaEspera';
import VentanaCargaInformacion from "../../../components/Otros/VentanaCargaInformacion";


/**
 *Componente funcional que renderiza la pagina del perfil y sus componentes
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
const PaginaPerfil = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['cookie-name']);
  const [cliente, setCliente] = useState([]);
  const [ordenesPendiente, setOrdenesPendiente] = useState([])
  const [ordenesAceptadas, setOrdenesAceptada] = useState([])
  const [ordenesProceso, setOrdenesProceso] = useState([])
  const [ordenesTerminada, setOrdenesTerminada] = useState([])
  const [ordenesPagadas, setOrdenesPagadas] = useState([])
  const [ordenesCancelada, setOrdenesCancelada] = useState([])

  useEffect(() => {
    /**
    *Funcion para cargar las ordenes y los usuarios del servidor
    *
    */
    async function loadUsuariosAndOrdens() {
      const responseUsuario = await getUsersById(cookies.userId,cookies.token);
      const responseOrdenes = await getOrdenesById(cookies.userId);

      if (responseUsuario.status === 200) {
        setCliente(responseUsuario.data.cliente[0]);
      }
 
      if (responseOrdenes.status === 200) {
        setOrdenesPendiente(responseOrdenes.data.ordenes[0].filter((orden) => orden.estado === 0));
        setOrdenesAceptada(responseOrdenes.data.ordenes[0].filter((orden) => orden.estado === 1));
        setOrdenesProceso(responseOrdenes.data.ordenes[0].filter((orden) => orden.estado === 2));
        setOrdenesTerminada(responseOrdenes.data.ordenes[0].filter((orden) => orden.estado === 3));
        setOrdenesPagadas(responseOrdenes.data.ordenes[0].filter((orden) => orden.estado === 4));
        setOrdenesCancelada(responseOrdenes.data.ordenes[0].filter((orden) => orden.estado === 5));
        setIsLoading(false);
      }
    }
    
    loadUsuariosAndOrdens();
  }, [cookies]);

  /**
  *Funcion para editar el perfil con la informacion del formulario de edicion
  * @param {Object} data Objecto que contiene la informacion del formulario
  *
  */
  async function editarPer(data){
    const response = await updateUser(data,cookies.token)
    AlertaConfirmacion(response.status, "Actualizando Informacion" )
    if(response.status === 200 || response.status ===201){
      window.location.reload(false);
    }
    
  }

  function renderPerfil() {
    if (!isLoading) {
      return ( 

          <div className="col-12 contenidoPrincipal" style={{backgroundColor: '#E6FFF6' }}>
              <div className="container-fluid">
                  <div className="row">
                      <InfoPerfil usuario={cliente} />
                  </div>
                  <div className="row ordenesContainer">
                      <OrdenesFiltradas
                        ordenesPend={ordenesPendiente}
                        ordenesProc={ordenesProceso}
                        ordenesT={ordenesTerminada}
                        ordenesC={ordenesCancelada}
                        ordenesPag={ordenesPagadas} 
                        ordenesA={ordenesAceptadas}
                        usuario={'Dentista'}
                      />
                  </div>
                  <EditarPerfil usuario={cliente} editar={editarPer} ocultar={true}/>
              </div>            
          </div>
      );
    } else {
      return <VentanaCargaInformacion/>;
    }
  }

  return (
    <Plantilla contenido={renderPerfil()}></Plantilla>
  );
};

export default accessControlDentisaAdmin(PaginaPerfil);
