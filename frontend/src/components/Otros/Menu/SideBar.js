import React, {useEffect,useState} from 'react'
import { useCookies } from 'react-cookie';
import {getUsersById} from  "../../../api/Usuario";
import * as menu from './MenuVerticalD'
import {Link} from 'react-router-dom'
import foto from '../../../images/logo.png'

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
    const [abrir, setAbrir] = useState(false);

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
                <img className="profile_image" src={foto} alt="perfil"/>
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
                    !abrir
                    ?
                    <Link to={opciones.url} key={index} style={{fontSize:"20px",marginLeft:"170px",width:"80px"}}><i className={`fas fa-${opciones.icono}`}></i><span style={{display:"none"}}>{opciones.label}</span></Link>
                    :
                    <Link to={opciones.url} key={index}><i className={`fas fa-${opciones.icono}`}></i><span>{opciones.label}</span></Link>
                    ))
            )
        }else if(cookies.tipoUsuario === 'Dentista'){
            return(
                menu.menuDataDentista.map((opciones,index) =>(
                    !abrir
                    ?
                    opciones.icono === "tooth" ?
                    <Link to={opciones.url} key={index}><i className={`fas fa-${opciones.icono}`} style={{fontSize:"20px",marginLeft:"170px",width:"80px"}}></i><span style={{display:"none"}}>{opciones.label}</span></Link>
                    :
                    <Link key={index} to={`/${cookies.userId}${opciones.url}`} style={{fontSize:"20px",marginLeft:"170px",width:"80px"}}><i className={`fas fa-${opciones.icono}`}></i><span style={{display:"none"}}>{opciones.label}</span></Link>
                    :
                    opciones.icono === "tooth" ?
                    <Link to={opciones.url} key={index}><i className={`fas fa-${opciones.icono}`}></i><span>{opciones.label}</span></Link>
                    :
                    <Link key={index} to={`/${cookies.userId}${opciones.url}`}><i className={`fas fa-${opciones.icono}`}></i><span >{opciones.label}</span></Link>
                ))
            )
        }else{
            return(
                menu.menuData.map((opciones,index) =>(
                        !abrir 
                        ?
                        <Link key={index} to={opciones.url}><i className={`fas fa-${opciones.icono}`} style={{fontSize:"20px",marginLeft:"170px",width:"80px"}}></i><span style={{display:"none"}}>{opciones.label}</span></Link>
                        :
                        <Link key={index} to={opciones.url}><i className={`fas fa-${opciones.icono}`} ></i><span>{opciones.label}</span></Link>
                ))
            )
        }
    }


    return (
     <div className="sidebar" style={!abrir ?{left: "-190px"} : {left:"0px"}} >
        <label htmlFor="check" className="w-100" alt="Menu">
            {
                !abrir 
                ?
                <a href onClick={()=>setAbrir(!abrir)} style={{fontSize:"20px",marginLeft:"170px",width:"80px"}}><i className='fas fa-bars text-white'></i><span style={{display:"none"}} className="text-white">Menu</span></a>
                :
                <a href onClick={()=>setAbrir(!abrir)} ><i className='fas fa-bars text-white'></i><span className="text-white">Menu</span></a>
   
            }
     </label>
        {renderDatosUsuario()}
        {renderOpciones()}

     </div>
    )
}

export default SideBar
