import React, {useEffect,useState} from 'react'
import { useCookies } from 'react-cookie';
import {getUsersById} from  "../../../api/Usuario";
import * as menu from './MenuVerticalD'

/**
 *Componente funcional que renderiza el header de la pagina
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function SideBar() {
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['cookie-name']);
    const [cliente, setCliente] = useState([]);

    useEffect(() => {
          /**
          *Funcion que carga la informacion del usuario en el sidebar
          *
          */
        async function loadUsuario() {
          const responseUsuario = await getUsersById(cookies.userId,cookies.token);
          if (responseUsuario.status === 200) {
            setCliente(responseUsuario.data.cliente[0]);
            setIsLoading(false)
          }
         
        }
        if(cookies.userId){
            loadUsuario();
        }
      }, [cookies]);
    
    function renderDatosUsuario(){
        if(!isLoading){
            return (
                <center>
                <img src=""  alt=""/>
                <img className="profile_image" src={`data:image/png;base64,${Buffer.from(cliente.fotoPerfil).toString("base64")}`} alt="perfil"/>
                <h4>{cliente.nombre}</h4>
               </center>
            )
        }else{
            return (
                <center>
                <img src="" className="profile_image" alt=""/>
                <h4>Lapro-Orto</h4>
               </center>
            )
        }
    }

    function renderOpciones(){
        if(cookies.tipoUsuario === 'Admin'){
            return(
                menu.menuDataAdmin.map((opciones,index) =>(
                    <a key={index} href={opciones.url}><i className={`fas fa-${opciones.icono}`}></i><span>{opciones.label}</span></a>
                ))
            )
        }else if(cookies.tipoUsuario === 'Dentista'){
            return(
                menu.menuDataDentista.map((opciones,index) =>(
                    <a key={index} href={opciones.url}><i className={`fas fa-${opciones.icono}`}></i><span>{opciones.label}</span></a>
                ))
            )
        }else{
            return(
                menu.menuData.map((opciones,index) =>(
                    <a key={index} href={opciones.url}><i className={`fas fa-${opciones.icono}`}></i><span>{opciones.label}</span></a>
                ))
            )
        }
    }


    return (
     <div className="sidebar">
        <label htmlFor="check" className="w-100">
            <a href><i className='fas fa-bars text-white'></i><span className="text-white">Menu</span></a>
        </label>
        {renderDatosUsuario()}
        {renderOpciones()}

     </div>
    )
}

export default SideBar
