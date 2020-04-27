import React from "react";

import Login from '../../components/Login'
import Contactanos from '../../components/SolicitarCuenta'
import {enviarCorreo as enviar} from '../../api/sendemail'
import { accessControlNone } from "../../helpers/accessControlNone";
import Pagina from "../../components/Otros/PlantillaPagina";
import Jumbotron from "../../components/Otros/Jumbotron";


const Home = ({cookies}) => {
  function enviarCorreo(datos){
    enviar(datos)
  }
  return (
       <Pagina contenido={
            [<Jumbotron nombre="Lapro-Orto"/>,
            <Contactanos enviar={enviarCorreo}/>,
            <Login cookies={cookies}/>]
       }></Pagina>     
  );
};

export default accessControlNone(Home)


