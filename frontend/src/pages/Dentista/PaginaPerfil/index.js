import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

import Plantilla from "../../../components/Otros/PlantillaPagina"
import InfoPerfil from "../../../components/Dentista/InfoPerfil";
import EditarPerfil from "../../../components/Dentista/EditarPerfil";
import OrdenesFiltradas from "../../../components/Admin/Ordenes";
import './styles.css';
import { getUsersById, updateUser } from "../../../api/users";
import { getOrdenesById } from "../../../api/orders";
import { accessControlDentisa } from "../../../helpers/accessControlDentisa";


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
    async function loadUsuariosAndOrdens() {
      const responseUsuario = await getUsersById(cookies.userId,cookies.token);
      const responseOrdenes = await getOrdenesById(cookies.userId);

      if (responseUsuario.status === 200) {
        setCliente(responseUsuario.data.cliente[0]);
      }

      if (responseOrdenes.status === 200) {
        console.log(responseOrdenes.data)
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

  async function editarPer(data){
    const response = await updateUser(data)
    console.log(response)
    window.location.reload(false);
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



                  <EditarPerfil usuario={cliente} editar={editarPer}/>
              </div>            
          </div>
      );
    } else {
      return <div>...cargando</div>;
    }
  }

  return (
    <Plantilla contenido={renderPerfil()}></Plantilla>
  );
};

export default accessControlDentisa(PaginaPerfil);
