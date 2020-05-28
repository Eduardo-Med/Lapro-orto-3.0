import React, { useState, useCallback } from "react";

import "./styles.css";
import {iniciarSesion} from "../../api/Autentificacion";
import { useCookies } from "react-cookie";
import {useForm} from "react-hook-form";

import logo from "./tooth.png";




/**
 *Componente funcional que renderiza el login y sus funciones
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function Login() {
  const [informacion, serInformacion] = useState({});
  const [, setCookie, ] = useCookies(["cookie-name"]);
  const {register, handleSubmit,errors} = useForm({mode: "onChange"})
  const [mensajeError, setMensajeError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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


  /**
   *Funcion para iniciar sesion
   *
   * @returns{string} Mensaje de resultado
   */
  const onSubmit = async (data)=>{
    const response = await iniciarSesion(informacion);
    if (response.status === 200) {
      setIsLoading(true)
      setCookie("token", response.data.token, { path: "/", maxAge: 3600 });
      setCookie("userId", response.data.userId, { path: "/", maxAge: 3600 });
      setCookie("tipoUsuario", response.data.tipoUsuario, {path: "/",maxAge: 3600,});
      response.data.tipoUsuario !== 'Admin' ?
      window.location.href = `/${response.data.userId}/perfil`:
      window.location.href = "admin/ordenes"
      setMensajeError('')
    } else if (response.status === 404) {
      setMensajeError("El correo no existe");
    } else {
      setMensajeError("contraseña incorrecta");
    }
  }



  const renderBotonEnviar=()=>{
    if(!isLoading){
        return (
          <button type="submit" className="btn btn-dark float-left mt-5">
          Iniciar Sesion
          </button>
        )
    }
    return(
        <div class="alert alert-info" role="alert">
              Espere por favor enviando informacion
        </div>
    )
  }

  return (
    <div className="modal fade" id="myModal1">
    <div className="modal-dialog">
      <div className="modal-content">
      <form  autocomplete="off" className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <button type="button" className="close cerrar" data-dismiss="modal">×</button>
        <img className="logo" src={logo} alt="logo" />
        <h4 className="mt-5 text-danger">{mensajeError}</h4>
        {errors.correo 
            ? <label className="registration-label text-danger letraborde" style={{fontSize:"22px"}}>{errors.correo.message}</label> 
            : <label className="registration-label"></label>}
        <div className="input-container">
          <i className="fas fa-user mr-2 text-white"></i>
          <input
            className="info-input user-input"
            type="text"
            placeholder="Correo electronico"
            id="correo"
            name="correo"
            required
            ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z0-9@._-]*$/, message:'Formato No valido'} 
                                                                                                                
          })} 
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
            ref={register({required: {value:true,message:'Este campo es obligatorio'}})}
            name="password"
            variant="filled"
            onChange={handleInputChange}
          />
        </div>
            {renderBotonEnviar()}
      </form>
      </div>
    </div>
  </div>
  

  );
}

export default Login
