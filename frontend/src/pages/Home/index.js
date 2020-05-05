import React from "react";

import Login from '../../components/Login'
import Contactanos from '../../components/SolicitarCuenta'
import { accessControlNone } from "../../helpers/accessControlNone";
import Pagina from "../../components/Otros/PlantillaPagina";
import Jumbotron from "../../components/Otros/Jumbotron";


const Home = ({cookies}) => {
  return (
       <Pagina contenido={
            [<Jumbotron nombre="Lapro-Orto"/>,
            <Contactanos/>,
            <Login cookies={cookies}/>,]
       }></Pagina>     
  );
};

export default accessControlNone(Home)


