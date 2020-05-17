import React, { useEffect, useState } from "react";
import OrdenesFiltradas from "../../../components/Admin/Ordenes";
import {getOrdenes} from "../../../api/Orden";
import { accessControlAdmin } from "../../../helpers/accessControlAdmin";
import Plantilla from "../../../components/Otros/PlantillaPagina"
import VentanaCargaInformacion from "../../../components/Otros/VentanaCargaInformacion"
import { useCookies } from 'react-cookie';


/**
 *Componente funcional que renderiza la pagina de Ordenes y sus componentes
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function PaginaOrdenes(){
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['cookie-name']);
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
      const response = await getOrdenes(cookies.token);
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
        setIsLoading(true);
      }
    }
    loadOrdenes();
  }, [cookies]);

  const renderOrdenes = () => {
    if (isLoading) {
      return (
        <OrdenesFiltradas
          ordenesPend={ordenesPendiente}
          ordenesProc={ordenesProceso}
          ordenesT={ordenesTerminada}
          ordenesC={ordenesCancelada}
          ordenesPag={ordenesPagadas}
          ordenesA={ordenesAceptadas}
          usuario={'Admin'}
        />
      );
    } else {
      return <VentanaCargaInformacion/>;
    }
  };

  return (
    <Plantilla contenido={[
      <div className="col-12 contenidoPrincipal">{renderOrdenes()}</div>,
    ]}></Plantilla>
  );
};

export default accessControlAdmin(PaginaOrdenes);
