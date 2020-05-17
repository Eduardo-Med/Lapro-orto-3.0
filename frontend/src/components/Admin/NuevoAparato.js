import React , { useState } from "react";
import {useForm} from "react-hook-form";

import logo from '../../images/logo.png'


/**
 *Componente Funcional que despliega formulario de aparatos
 *Funciona para agregar nuevos aparatos
 *@constructor
 * 
 * @param {Function} enviar funcion para enviar la informacion del formulario al servidor
 * @returns Codigo HTML 
 */

function NuevoAparato( {enviar} ) {
  const {register, handleSubmit,errors} = useForm({mode: "onChange"})
    const [imagen, setImagen] = useState({enviar});
    const [isLoading, setIsLoading] = useState(false)

    const handleInputImagenChange = (event) => {
      event.persist();
      setImagen({...imagen, [event.target.name]: event.target.files[0]});
    }

    const onSubmit =(data)=>{
      setIsLoading(true)
      enviar(data,imagen)
    }

    const renderBotonEnviar=()=>{
      if(!isLoading){
          return (
            <button type="submit" className="registration-btn">Agregar Aparato</button>
          )
      }
      return(
          <div class="alert alert-info" role="alert">
                Espere por favor enviando informacion
          </div>
      )
    }
  
    
    return (
      <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="authentication-wrapper">
           <div className="registration registrationOrden">
             <div className="registration-header">
               <img src={logo} alt="" className="registration-logo"/>
             </div>
             <div className="registration-body">
               <h3 className="registration-title">Agregar Producto</h3>
               <form action=""  autocomplete="off" onSubmit={handleSubmit(onSubmit)} className="registration-form">
               {errors.titulo 
                       ? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.titulo.message}</label> 
                       : <label className="registration-label">Titulo</label>}
             <input type="text" id="titulo" name="titulo"
             ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
             className="registration-input"  placeholder="Titulo" />
 
             {errors.descripcion 
                       ? <label className="registration-label text-danger" style={{fontSize:"22px"}}>{errors.descripcion.message}</label> 
                       : <label className="registration-label">Descrpicion</label>}
             <textarea type="text" id="descripcion" name="descripcion" 
             ref={register({required: {value:true,message:'Este campo es obligatorio'}})} 
             className="registration-input"  placeholder="Descripcion" />
             
             <label className="registration-label">Adjuntar Foto</label>
	  		     <input type="file" id="imagen" name="imagen" className="registration-input" placeholder="Imagen" onChange={handleInputImagenChange}/>
 
                  {renderBotonEnviar()}
                   </form>
             </div>
           </div>
          </div>
       </div>
      </div>
     </div>
    )
}


export default NuevoAparato
