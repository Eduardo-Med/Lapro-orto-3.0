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
    const [isLoading, setIsLoading] = useState(false)
    const [fecha] = useState(new Date())
      const handleInputImagenChange = (event) => {
        event.persist();
        setImagen({...imagen, [event.target.name]: event.target.files[0]});
      }
      
      const onSubmit =(data)=>{
        setIsLoading(true)
        setTimeout(function(){ setIsLoading(false) },5000)
        enviar(data,imagen)
      }

      const renderBotonEnviar=()=>{
        if(!isLoading){
            return (
              <button type="submit" className="registration-btn">Crear Orden</button>
            )
        }
        return(
            <div class="alert alert-info" role="alert">
                  Espere por favor enviando informacion
                  
            </div>
        )
      }

      const formatoFecha=(date)=>{
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
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
                  ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'},
                  maxLength : {value: 40,message: 'caracteres maximo 40'},
                  minLength : {value: 6,message: 'Caracteres minmos  6'  } })}  
                  name="clinica" 
                  placeholder="Clinica"  
                />
	  		    		
                {errors.paciente 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.paciente.message}</label> 
                : <label className="registration-label">Paciente*</label>}
                <input type="text" id="paciente" name="paciente" 
                ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'},
                maxLength : {value: 60,message: 'caracteres maximo 60'},
                minLength : {value: 6,message: 'Caracteres minmos  6'  } })}  
                className="registration-input" placeholder="Paciente" />

                {errors.fechaSalida 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.fechaSalida.message}</label> 
                : <label className="registration-label">Fecha De Entrega*</label>}
                <input type="date" id="fechaSalida" name="fechaSalida" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
                 className="registration-input" placeholder="Fecha Salida" min="2020-05-30" max="2020-07-30"/>
                
                {errors.doctor 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.doctor.message}</label> 
                : <label className="registration-label">Doctor*</label>}
                <input type="text" id="doctor" name="doctor" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'},
                 maxLength : {value: 60,message: 'caracteres maximo 60'},
                 minLength : {value: 6,message: 'Caracteres minmos  6'  } })}   
                className="registration-input" placeholder="Doctor" />

                {errors.fechaEntrada 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.fechaEntrada.message}</label> 
                : <label className="registration-label">Fecha Actual*</label>}
                <input type="date" id="fechaEntrada" name="fechaEntrada" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
                className="registration-input" placeholder="Fecha Entrada" min={formatoFecha(fecha.toString())} max={formatoFecha(fecha.toString())} value={formatoFecha(fecha.toString())}/>
                

                {errors.nombreAparato 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.nombreAparato.message}</label> 
                : <label className="registration-label">Aprato a realizar*</label>}
                <input type="text" id="nombreAparato" name="nombreAparato" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'},
                 maxLength : {value: 60,message: 'caracteres maximo 60'},
                 minLength : {value: 6,message: 'Caracteres minmos  6'  } })}  
                className="registration-input" placeholder="Nombre Aparato" />
                
                {errors.trabajoRealizar 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.trabajoRealizar.message}</label> 
                : <label className="registration-label">Descripcion Del Aparato A Realizar*</label>}
                <textarea  type="text" id="trabajoRealizar" name="trabajoRealizar" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z0-9 ]*$/, message:'Solo letras y numeros'}, 
                 maxLength : {value: 2048,message: 'caracteres maximo 2048'},
                 minLength : {value: 2,message: 'Caracteres minmos  2'  } })}                                                       
                className="registration-input" placeholder="Descripcion" />

                {errors.color 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.color.message}</label> 
                : <label className="registration-label">Color*</label>}
                <input type="text" id="color" name="color" 
                ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'},
                maxLength : {value: 25,message: 'caracteres maximo 25'},
                minLength : {value: 2,message: 'Caracteres minmos  2'  } })}  
                className="registration-input" placeholder="Color" />

                {errors.material 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.material.message}</label> 
                : <label className="registration-label">Material*</label>}
                <input type="text" id="material" name="material" 
                ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[^\s+$]/, message:'Este campo es obligatorio'},
                maxLength : {value: 40,message: 'caracteres maximo 40'},
                minLength : {value: 2,message: 'Caracteres minmos  2'  } })}  
                className="registration-input" placeholder="Material" />

                <label className="registration-label">Adjuntar Foto</label>
	  		    		<input type="file" accept=".jpg,.png,.jpng" id="imagen" name="imagen" className="registration-input" placeholder="Imagen" onChange={handleInputImagenChange}/>

                {errors.observaciones 
                ? <label className="registration-label text-danger" style={{fontSize:"28px"}}>{errors.observaciones.message}</label> 
                : <label className="registration-label">Observaciones*</label>}
                <input type="text" id="observaciones" name="observaciones" 
                 ref={register({required: {value:true,message:'Este campo es obligatorio'},
                 maxLength : {value: 40,message: 'caracteres maximo 40'},
                 minLength : {value: 2,message: 'Caracteres minmos  2'  } })}  
                className="registration-input" placeholder="Observaciones" />
        
                {renderBotonEnviar()}
                </form>
	  		    </div>
	  	    </div>
	       </div>
    </div>
    
  );
}

export default NuevaOrden