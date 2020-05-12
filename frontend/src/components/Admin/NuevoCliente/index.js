import React from "react";
import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";

import './styles.css'
import logo from './../../../images/logo.png'

/**
 *Componente funcional que contiene el formulario para agregar un nuevo usuario
 *@constructor
 *
 * @param {Function} enviar funcion para enviar la informacion del formulario al servidor
 * @returns Codigo HTML
 */
function NuevoCliente({enviar}) {
  const {register, handleSubmit,errors} = useForm({mode: "onChange"})

  const onSubmit =(data)=>{
	enviar(data)
  }

  return (
    <div className="modal fade bd-example-modal-lg" tabIndex="-1" id="modalRegistro" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
     <div className="modal-dialog modal-lg">
       <div className="modal-content">
         <div className="authentication-wrapper">
	  	    <div className="registration">
	  		    <div className="registration-header">
	  		    	<img src={logo} alt="" className="registration-logo"/>
	  		    </div>
	  		    <div className="registration-body">
	  		    	<h3 className="registration-title">Registrar</h3>
	  		    	<form action=""  autocomplete="off" onSubmit={handleSubmit(onSubmit)} className="registration-form">
					  	{errors.nombre 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.nombre.message}</label> 
                	  	: <label className="registration-label">Nombre</label>}
						<input type="text" id="name" name="nombre" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'} })} 
						className="registration-input"  placeholder="Nombre" />

						{errors.apellidoPaterno 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.apellidoPaterno.message}</label> 
                	  	: <label className="registration-label">Apellido Paterno</label>}
						<input type="text" id="apellidoPaterno" name="apellidoPaterno" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'} })} 
						className="registration-input"  placeholder="Apellido Paterno" />
						
						{errors.apellidoMaterno 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.apellidoMaterno.message}</label> 
                	  	: <label className="registration-label">Apellido Materno</label>}
						<input type="text" id="apellidoMaterno" name="apellidoMaterno" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'} })} 
						className="registration-input" placeholder="Apellido Materno" />


						{errors.direccion 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.direccion.message}</label> 
                	  	: <label className="registration-label">Direccion</label>}
						<input type="text" id="direccion" name="direccion"
						ref={register({required: {value:true,message:'Este campo es obligatorio'} })}  
						className="registration-input" placeholder="Direccion" />
						
						{errors.correo 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.correo.message}</label> 
                	  	: <label className="registration-label">Correo</label>}
						<input type="text" id="correo" name="correo" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[a-z0-9_.-]+@[a-z0-9]+\.[a-z]{2,}/, message:'Correo invalido'} })} 
						className="registration-input" placeholder="Correo" />
						
						{errors.telefono 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.telefono.message}</label> 
                	  	: <label className="registration-label">Telefono</label>}
						<input type="number" id="telefono" name="telefono" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[0-9 ]*$/, message:'Solo numeros'} })} 
						className="registration-input" placeholder="Telefono" />

						{errors.password 
                	  	? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.password.message}</label> 
                	  	: <label className="registration-label">Contraseña</label>}
						<input type="password" id="password" name="password" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
						className="registration-input" placeholder="Contraseña" />

                		<button type="submit" className="registration-btn">Agregar Usuario</button>
                	</form>
	  		    </div>
	  	    </div>
	       </div>
      </div>
     </div>
    </div>
  );
}

NuevoCliente.propTypes = {
	enviar: PropTypes.func.isRequired,
};

export default NuevoCliente;


