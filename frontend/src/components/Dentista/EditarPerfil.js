import React , { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import {cambiarContrasena} from '../../api/Usuario'
import {AlertaConfirmacion} from '../../helpers/AlertaEspera';
import {validarcontrasena} from '../../helpers/validarContrasena';
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
  const [nivelContra, setNivelContra] = useState("Nivel: ");
  const [colorNivel, setColorNivel] = useState("");
  const [ver, setVer] = useState(false);
  const [activarBoton, setActivarBoton] = useState(true);


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
   if(event.target.name === "password"){
     const informacion = validarcontrasena(event.target.value)
     if(event.target.value.length >= 5){
       setActivarBoton(false)
     }else{
      setActivarBoton(true)
     }
     setColorNivel(informacion.color)
     setNivelContra(informacion.nivel)
     console.log(informacion.color)
   }
    event.persist();
    setDatosForm({...datosForm, [event.target.name]: event.target.value});
 }

 const confirmarContrasena = async (datosForm)=>{
      const response = await cambiarContrasena(datosForm)
      AlertaConfirmacion(response.status, "Actualizando Informacion" )
      if(response.status === 200 || response.status ===201){
        window.location.reload(false);
      }
 }

 const accionEnter = (e)=>{
  if (e.charCode === 13) {
    confirmarContrasena(datosForm)
  }
 }


 const renderContrasena=()=>{
    if(!cambiarContra){
      return <button type="button" className="registration-btn-danger" onClick={()=>setCambiarContra(true)}>Cambiar Contraseña</button>
    }else{
      return(
        <form className="registration-form" autoComplete="off" onSubmit={()=>confirmarContrasena(datosForm)}>
          <label className="registration-label">Contraseña</label><br/>
          <input value={datosForm.password} name="password" required className="registration-input" label="Contraseña" variant="filled" type={!ver ? "password" : "text"} onChange={handleInputChange} onKeyPress={accionEnter} />
          <label style={{color:colorNivel}}>{nivelContra}</label>
          <div><label>Ver contraseña</label><input onClick={()=>setVer(!ver)} type="checkbox" className="ml-3"/></div>
          <button type="submit" className="registration-btn mt-3" style={activarBoton ? {cursor:"default"}:{cursor:"pointer"}} disabled={activarBoton}>Confirmar Contraseña</button>
          <button type="button" className="registration-btn-danger" onClick={()=>setCambiarContra(!cambiarContra)}>Cancelar</button>
        </form>
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
             {
               !cambiarContra
               ?
               <form  className="registration-form" autoComplete="off" onSubmit={() => editar(datosForm)}>
            
               <label className="registration-label">Nombre</label>
               <input  value={datosForm.nombre} maxLength="35" minLength="3" required className="registration-input" name="nombre" label="Nombre" variant="filled" type="text" onChange={handleInputChange} />

               <label className="registration-label">Apellido Paterno</label>
               <input  value={datosForm.apellidoPaterno} maxLength="35" minLength="3" required className="registration-input" name="apellidoPaterno" label="Apellido Paterno" type="text" variant="filled" onChange={handleInputChange}/>

               <label className="registration-label">Apellido Materno</label>
               <input  value={datosForm.apellidoMaterno} maxLength="35" minLength="3" required className="registration-input" name="apellidoMaterno" label="Apellido Materno" type="text" variant="filled" onChange={handleInputChange}/>

               <label className="registration-label">Direccion</label>
               <input value={datosForm.direccion} maxLength="160" minLength="6" required name="direccion" className="registration-input" label="Direccion" variant="filled" type="text" onChange={handleInputChange} />

               <label className="registration-label">Telefono</label>
               <input value={datosForm.telefono} maxLength="10" minLength="10" required name="telefono" className="registration-input" label="Telefono" variant="filled" type="text" onChange={handleInputChange} />

               <label className="registration-label">Correo</label>
               <input value={datosForm.correo} name="correo" disabled className="registration-input" label="Correo" variant="filled" type="text" onChange={handleInputChange} />

               {renderContrasena()}
               
                 <Button type="submit" className="registration-btn mt-3" variant="contained">Enviar </Button>
              </form>
               :
               renderContrasena()
             }
           </div>
         </div> 
        </div>
     </div>
    </div>
   </div>
    
  );
};

export default EditarPerfil






