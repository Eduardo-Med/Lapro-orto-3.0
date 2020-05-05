import React, { useState, useCallback } from "react";

import "./styles.css";
import { iniciarSesion } from "../../api/auth";
import { useCookies } from "react-cookie";
import logo from "./tooth.png";

export default function Login() {
  const [informacion, serInformacion] = useState({});
  const [, setCookie, ] = useCookies(["cookie-name"]);
  const [mensajeError, setMensajeError] = useState('')

  const handleInputChange = useCallback(
    (event) => {
      event.persist();
      serInformacion({
        ...informacion,
        [event.target.name]: event.target.value,
      });
    },
    [informacion]
  );

  async function iniciar() {
    const response = await iniciarSesion(informacion);
    if (response.status === 200) {
      setCookie("token", response.data.token, { path: "/", maxAge: 3600 });
      setCookie("userId", response.data.userId, { path: "/", maxAge: 3600 });
      setCookie("tipoUsuario", response.data.tipoUsuario, {path: "/",maxAge: 3600,});
      response.data.tipoUsuario !== 'Admin' ? 
      window.location.href = "http://localhost:3000/11/perfil" :
      window.location.href = "http://localhost:3000/admin/ordenes"
      console.log("Inicio de sesion correcto");
      setMensajeError('')
    } else if (response.status === 404) {
      setMensajeError("El correo no existe");
    } else {
      setMensajeError("contraseña incorrecta");
    }
  }

  return (
    <div className="modal fade" id="myModal1">
    <div className="modal-dialog">
      <div className="modal-content">
      
 
      <div  autocomplete="off" className="login-container">
      <button type="button" className="close cerrar" data-dismiss="modal">×</button>
        <img className="logo" src={logo} alt="logo" />
        <h4 className="mt-5 text-danger">{mensajeError}</h4>
        <div className="input-container">
         
          <i className="fas fa-user mr-2 text-white"></i>
          <input
            className="info-input user-input"
            type="text"
            placeholder="Correo electronico"
            id="correo"
            name="correo"
            onChange={handleInputChange}
          />
        </div>

        <div className="input-container">
          <i className="fas fa-lock mr-2 text-white"></i>
          <input
            className="info-input password-input"
            type="password"
            placeholder="Contraseña"
            id="password"
            name="password"
            variant="filled"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" onClick={()=>iniciar()} className="btn btn-dark float-left mt-5">
              Iniciar Sesion
          </button>
        <div className="input-container">
         
          <label className="recordar-contraseña-lbl mr-3">
            Recordar contraseña
          </label>
          <input type="checkbox" />

          <a className="olvidado-contraseña" href="#1">
            ¿Haz olvidado tu contraseña?
          </a>
        </div>
      </div>
      </div>
    </div>
  </div>
  

  );
}

