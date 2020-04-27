import React from "react";
import Plantilla from "../../../components/Otros/PlantillaPagina"
import { accessControlAdmin } from "../../../helpers/accessControlAdmin";



const PaginaInicioAdmin = () => {
  return (
    <div>
      <Plantilla contenido={[]}/>
      {/*Navbar*/}
      {/*Jumbotron*/}
      {/*accesoRapidoOrdenes*/}
    </div>
  );
};

export default accessControlAdmin(PaginaInicioAdmin)