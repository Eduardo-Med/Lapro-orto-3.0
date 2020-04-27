import React from "react";
import { useCookies } from 'react-cookie';
import logo from './logo.png'

function Header({usuario}) {
  const [cookies, , removeCookie] = useCookies(['cookie-name']);

  function salir(){
    removeCookie('token', {path: '/'});
    removeCookie('userId', {path: '/'});
    removeCookie('tipoUsuario', {path: '/'});
    window.location.href = "http://localhost:3000/"
  }


  function renderOpcionesDeIncio(){
    return cookies.tipoUsuario ? (
      <div className=" col-sm-10 col-md-4 d-flex flex-row-reverse">
          <button className="btn btn-danger mb-5" onClick={()=>salir()} >Salir</button>
          <i className="far fa-bell fa-2x mr-3 mt-1 float-left" style={{color: 'white'}}></i>
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
