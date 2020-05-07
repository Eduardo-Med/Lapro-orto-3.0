import React, {useEffect, useState} from "react";
import { useCookies } from 'react-cookie';
import logo from './logo.png'
import ListaNotificaciones from './../Notificacion'
import {getNotificacion} from '../../../api/Notificacion'


/**
 *Componente funcional que renderiza el header de la pagina
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function Header() {
  const [cookies, , removeCookie] = useCookies(['cookie-name']);
  const [notificaciones, setNotificaciones] = useState([])
 

  useEffect(() => {

    /**
    *Funcion para cargar las ordenes y los usuarios del servidor
    *
    */
    async function loadNotificacion() {
      const response = await getNotificacion(cookies.userId);
      if (response.status === 200) {
        console.log("Notificacion: ")
        console.log(response.data.notificacion)
        setNotificaciones(response.data.notificacion);
      }
    }    
    loadNotificacion();
  }, [cookies]);

   /**
   *Funcion para salir de la sesion
   *Elimina las cookies
   *
   * @returns{string} Mensaje de resultado
   */
  function salir(){
    removeCookie('token', {path: '/'});
    removeCookie('userId', {path: '/'});
    removeCookie('tipoUsuario', {path: '/'});
    window.location.href = "http://localhost:3000/"
  }

  function numeroNotifcaciones(){
    if(notificaciones){
      return <span>{notificaciones.length}</span> 
    }
    return <span>0</span>
  }


  function renderOpcionesDeIncio(){
    return cookies.tipoUsuario ? (
      <div className=" col-4 d-flex flex-row-reverse p-0">
          <button className="btn btn-danger mb-5" onClick={()=>salir()} >Salir</button>
          <div className="d-inline dropdown mr-3">
          <div className="dropdown-toggle text-white" id="notifications" data-toggle="dropdown">
            <div className="numPosition">
            {numeroNotifcaciones()}
            </div>
            <i className="far fa-bell fa-2x mr-3 mt-1 float-left" style={{color: 'white', height: '40px'}}></i>
          </div>
            <ListaNotificaciones listaNotificacion={notificaciones}/>
          </div>
      </div>
    ) :
    <div className=" col-4 d-flex flex-row-reverse p-0">
          <button type="button" className="btn btn-primary btn-sm mb-5" data-toggle="modal" data-target="#myModal1">Iniciar Sesion</button>
    </div>
  }

  return (
    <div className="row header">
      <div className=" col-8 mt-1">
      <img src={logo} className="logo_image float-left mr-2" alt=""/>
        <div className="left_area float-left">
          <h3>Lapro-<span>Orto</span></h3>
        </div>
      </div>
      {renderOpcionesDeIncio()}
    </div>
  );
}

export default Header;
