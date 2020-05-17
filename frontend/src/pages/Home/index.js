import React, {useState,useEffect} from "react";

import Login from '../../components/Login'
import Contactanos from '../../components/SolicitarCuenta'
import { accessControlNone } from "../../helpers/accessControlNone";
import Pagina from "../../components/Otros/PlantillaPagina";
import Jumbotron from "../../components/Otros/Jumbotron";
import VentanaCarga from "../../components/Otros/VentanaCarga";


function Home({cookies}){

     const [isLoading, setIsLoading] = useState(true)
     useEffect(() => {
          setTimeout(function(){ 
               setIsLoading(false) 
          }, 3000);
     }, [])

     if(!isLoading){
          return (
               <Pagina contenido={
                    [
                    <Jumbotron nombre="Lapro-Orto"/>,
                    <Contactanos/>,
                    <Login cookies={cookies}/>,]
               }></Pagina>     
          );
     }else{
          return(
               <VentanaCarga/>
          )
     }
};

export default accessControlNone(Home)


