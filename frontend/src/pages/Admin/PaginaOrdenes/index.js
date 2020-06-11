import React, { useEffect, useState } from "react";
import OrdenesFiltradas from "../../../components/Admin/Ordenes";
import {getOrdenes} from "../../../api/Orden";
import { accessControlAdmin } from "../../../helpers/accessControlAdmin";
import Plantilla from "../../../components/Otros/PlantillaPagina"
import InfoPerfil from "../../../components/Dentista/InfoPerfil";
import EditarPerfil from "../../../components/Dentista/EditarPerfil";
import VentanaCargaInformacion from "../../../components/Otros/VentanaCargaInformacion"
import { useCookies } from 'react-cookie';
import { getUsersById, updateUser } from "../../../api/Usuario";
import { AlertaConfirmacion } from "../../../helpers/AlertaEspera";


/**
 *Componente funcional que renderiza la pagina de Ordenes y sus componentes
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function PaginaOrdenes(){
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['cookie-name']);
  const [cliente, setCliente] = useState([]);
  const [ordenesPendiente, setOrdenesPendiente] = useState([]);
  const [ordenesAceptadas, setOrdenesAceptada] = useState([]);
  const [ordenesProceso, setOrdenesProceso] = useState([]);
  const [ordenesTerminada, setOrdenesTerminada] = useState([]);
  const [ordenesPagadas, setOrdenesPagadas] = useState([]);
  const [ordenesCancelada, setOrdenesCancelada] = useState([]);

  useEffect(() => {
    /**
    *Funcion para agregar caragr las ordenes desde el servidor
    *
    */
    async function loadOrdenes() {
      const responseUsuario = await getUsersById(cookies.userId,cookies.token);
      const response = await getOrdenes(cookies.token);
      if (responseUsuario.status === 200) {
        setCliente(responseUsuario.data.cliente[0]);
        console.log(responseUsuario.data.cliente[0].nombre)
      }
      
      if (response.status === 200) {
        setOrdenesPendiente(
          response.data.ordenes[0].filter((orden) => orden.estado === 0)
        );
        setOrdenesAceptada(
          response.data.ordenes[0].filter((orden) => orden.estado === 1)
        );
        setOrdenesProceso(
          response.data.ordenes[0].filter((orden) => orden.estado === 2)
        );
        setOrdenesTerminada(
          response.data.ordenes[0].filter((orden) => orden.estado === 3)
        );
        setOrdenesPagadas(
          response.data.ordenes[0].filter((orden) => orden.estado === 4)
        );
        setOrdenesCancelada(
          response.data.ordenes[0].filter((orden) => orden.estado === 5)
        );
        setIsLoading(false);
      }
    }
    loadOrdenes();
  }, [cookies]);

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
                        usuario={'Admin'}
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

export default accessControlAdmin(PaginaOrdenes);
