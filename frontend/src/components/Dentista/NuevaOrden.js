import React, { useState } from "react";
import {useForm} from "react-hook-form";

import logo from '../../images/logo.png'


/**
 *Componente funcional que renderiza el formulario de agregar nueva orden
 *
 * @constructor
 * 
 * @param {Function} enviar funcion que se utiliza para la enviar la informacion del formulario al servidor
 * @returns Codigo HTML
 */
function NuevaOrden({enviar}) {
    const {register, handleSubmit,errors} = useForm({mode: "onChange"})
    const [imagen, setImagen] = useState({});
    
      const handleInputImagenChange = (event) => {
        event.persist();
        setImagen({...imagen, [event.target.name]: event.target.files[0]});
      }
      
      const onSubmit =(data)=>{
        enviar(data,imagen)
      }

      
  return (
    <div className="row">
       <div className="authentication-wrapper w-100">
	  	    <div className="registration registrationOrden">
	  		    <div className="registration-header">
	  		    	<img src={logo} alt="" className="registration-logo"/>
	  		    </div>
	  		    <div className="registration-body">
	  		    	<h3 className="registration-title">Realizar Orden</h3>
	  		    	<form onSubmit={handleSubmit(onSubmit)}  autocomplete="off" className="registration-form">
                
                {errors.clinica 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.clinica.message}</label> 
                : <label className="registration-label">Clinica</label>}
                <input type="text" id="clinica" className="registration-input" 
                  ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'} })} 
                  name="clinica" 
                  placeholder="Clinica"  
                />
	  		    		
                {errors.paciente 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.paciente.message}</label> 
                : <label className="registration-label">Paciente</label>}
                <input type="text" id="paciente" name="paciente" 
                ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'} })} 
                className="registration-input" placeholder="Paciente" />
                
                {errors.fechaSalida 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.fechaSalida.message}</label> 
                : <label className="registration-label">Fecha De Salida</label>}
                <input type="date" id="fechaSalida" name="fechaSalida" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
                 className="registration-input" placeholder="Fecha Salida"/>
                
                {errors.doctor 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.doctor.message}</label> 
                : <label className="registration-label">Doctor</label>}
                <input type="text" id="doctor" name="doctor" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'} })} 
                className="registration-input" placeholder="Doctor" />

                {errors.fechaSalida 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.fechaEntrada.message}</label> 
                : <label className="registration-label">Fecha De Entrada</label>}
                <input type="date" id="fechaEntrada" name="fechaEntrada" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
                className="registration-input" placeholder="Fecha Entrada" />
                

                {errors.nombreAparato 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.nombreAparato.message}</label> 
                : <label className="registration-label">Aprato a realizar</label>}
                <input type="text" id="nombreAparato" name="nombreAparato" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'} })} 
                className="registration-input" placeholder="Nombre Aparato" />
                
                {errors.trabajoRealizar 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.trabajoRealizar.message}</label> 
                : <label className="registration-label">Descripcion Del Aparato A Realizar</label>}
                <textarea  type="text" id="trabajoRealizar" name="trabajoRealizar" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'} })} 
                className="registration-input" placeholder="Descripcion" />

                {errors.color 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.color.message}</label> 
                : <label className="registration-label">Color</label>}
                <input type="text" id="color" name="color" 
                ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'} })} 
                className="registration-input" placeholder="Color" />

                {errors.material 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.material.message}</label> 
                : <label className="registration-label">Material</label>}
                <input type="text" id="material" name="material" 
                ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'} })} 
                className="registration-input" placeholder="Material" />

                <label className="registration-label">Adjuntar Foto</label>
	  		    		<input type="file" id="imagen" name="imagen" className="registration-input" placeholder="Imagen" onChange={handleInputImagenChange}/>

                {errors.observaciones 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.observaciones.message}</label> 
                : <label className="registration-label">Observaciones</label>}
                <input type="text" id="observaciones" name="observaciones" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
                className="registration-input" placeholder="Observaciones" />
        
                <button type="submit" className="registration-btn">Crear Orden</button>
                </form>
	  		    </div>
	  	    </div>
	       </div>
    </div>
    
  );
}

export default NuevaOrden