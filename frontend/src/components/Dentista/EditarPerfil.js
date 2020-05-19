import React , { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import {cambiarContrasena} from '../../api/Usuario'
import logo from '../../images/logo.png'



/**
 *Componente funcional que renderiza el formulario de editar perfil
 *
 * @constructor
 * 
 * @param {Function} editar funcion que se utiliza para la edicion del usuario
 * @param {Object} usuario Objecto que contiene la informacion del usuario
 * @returns Codigo HTML
 */
function EditarPerfil({editar, usuario,ocultar}){
  const [datosForm, setDatosForm] = useState({ idCliente:"", nombre:"", apellidoPaterno:"", apellidoMaterno:"", direccion:"", telefono:"", correo:"", password:""});
  const [cambiarContra, setCambiarContra] = useState(false)

  useEffect(() => {
    if(usuario){
      setDatosForm({
        idCliente: usuario.idCliente,
        nombre: usuario.nombre,
        apellidoPaterno: usuario.apellidoPaterno,
        apellidoMaterno: usuario.apellidoMaterno,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        correo: usuario.correo,
        password: usuario.password
     })
    }
  }, [usuario])



 const handleInputChange = (event) => {
    event.persist();
    setDatosForm({...datosForm, [event.target.name]: event.target.value});
 }

 const confirmarContrasena = (datosForm)=>{
      cambiarContrasena(datosForm)
      window.location.reload(false);
 }


 const renderContrasena=()=>{
    if(!cambiarContra){
      return <button type="button" className="registration-btn-danger" onClick={()=>setCambiarContra(true)}>Cambiar Contraseña</button>
    }else{
      return(
        <div>
          <label className="registration-label">Contraseña</label>
          <input value={datosForm.password} name="password" className="registration-input" label="Contraseña" variant="filled" type="password" onChange={handleInputChange} />
          <button type="button" className="registration-btn-danger" onClick={()=>confirmarContrasena(datosForm)}>Confirmar Contraseña</button>
        </div>
      )
    }
 }


  return (
    <div className="modal fade bd-example-modal-lg" style={{overflowX: 'scroll'}} id="modalEdicion" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className={`modal-content  + ${!ocultar ? "" : "acomodarModal"}`}>
        <div className="authentication-wrapper">
         <div className="registration">
           <div className="registration-header">
             <img src={logo} alt="" className="registration-logo"/>
           </div>
           <div className="registration-body">
             <h3 className="registration-title">Editar</h3>
             <form  className="registration-form" autoComplete="off">
            
                  <label className="registration-label">Nombre</label>
                  <input  value={datosForm.nombre} className="registration-input" name="nombre" label="Nombre" variant="filled" type="text" onChange={handleInputChange} />

                  <label className="registration-label">Apellido Paterno</label>
                  <input  value={datosForm.apellidoPaterno} className="registration-input" name="apellidoPaterno" label="Apellido Paterno" type="text" variant="filled" onChange={handleInputChange}/>

                  <label className="registration-label">Apellido Materno</label>
                  <input  value={datosForm.apellidoMaterno} className="registration-input" name="apellidoMaterno" label="Apellido Materno" type="text" variant="filled" onChange={handleInputChange}/>

                  <label className="registration-label">Direccion</label>
                  <input value={datosForm.direccion} name="direccion" className="registration-input" label="Direccion" variant="filled" type="text" onChange={handleInputChange} />

                  <label className="registration-label">Correo</label>
                  <input value={datosForm.telefono} name="telefono" className="registration-input" label="Telefono" variant="filled" type="text" onChange={handleInputChange} />

                  <label className="registration-label">Telefono</label>
                  <input value={datosForm.correo} name="correo" disabled className="registration-input" label="Correo" variant="filled" type="text" onChange={handleInputChange} />

                  {renderContrasena()}
                  
                    <Button type="button" onClick={() => editar(datosForm)}  className="registration-btn mt-3" variant="contained">Enviar </Button>
                 </form>
           </div>
         </div> 
        </div>
     </div>
    </div>
   </div>
    
  );
};

export default EditarPerfil






