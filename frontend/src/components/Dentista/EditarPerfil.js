import React , { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import logo from '../../images/logo.png'

const EditarPerfil = ({editar, usuario}) => {
 const [datosForm, setDatosForm] = useState({ idCliente:"", nombre:"", apellidoPaterno:"", apellidoMaterno:"", direccion:"", telefono:"", correo:"", password:""});
useEffect(() => {
  if(usuario){
    console.log(usuario)
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


  return (
    <div className="modal fade bd-example-modal-lg" id="modalEdicion" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="authentication-wrapper">
         <div className="registration">
           <div className="registration-header">
             <img src={logo} alt="" className="registration-logo"/>
           </div>
           <div className="registration-body">
             <h3 className="registration-title">Editar</h3>
             <form  className="registration-form">
            
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

                  <label className="registration-label">Contraseña</label>
                  <input value={datosForm.password} name="password" className="registration-input" label="Contraseña" variant="filled" type="password" onChange={handleInputChange} />

                    <Button type="button" onClick={() => editar(datosForm)} variant="contained">Enviar </Button>
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






