import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {enviarCorreo} from "../../api/SendEmail";
import {mensajeRespuesta} from '../../helpers/respuestas'
import './styles.css'



/**
 *Componente funcional que renderiza el formulario para solicitar una cuenta
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function SolicitarCuenta() {
    const [respuesta, setRespuesta] = useState()
    const [activo, setActivo] = useState(false);
    const {register, handleSubmit,errors} = useForm({mode: "onChange"})

  
    /**
    *Funcion para enviar la informacion del formulario al servidor
    *
    * @param {Object} data objeto con la informacion del formulario
    */
    const onSubmit = async (data)=>{
        const response = await enviarCorreo(data)
        setRespuesta(response)
        setActivo(true);
    }

    return (
        <row className>
            <div className="container-fluid solictarBody">
                <div className="row">
                    <div className="col">
                        <h3 className="solcitarTitulo">Solicitar Cuenta</h3>
                    </div>
                  
                </div>
                <div className="row">
                    <form action=""  onSubmit={handleSubmit(onSubmit)} className="w-100">
		  	            {errors.nameContactanos 
                	  	? <label className="solictarLabel text-danger" style={{fontSize:"22px"}}>{errors.nombre.message}</label> 
                	  	: <label className="solictarLabel">Nombre</label>}
						<input type="text" id="nameContactanos" name="nameContactanos" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[a-zA-Z ]*$/, message:'Solo letras'} })} 
						className="solicitarInput"  placeholder="Nombre" />
				        
                        {errors.correo 
                	  	? <label className="solictarLabel text-danger" style={{fontSize:"22px"}}>{errors.correo.message}</label> 
                	  	: <label className="solictarLabel">Correo</label>}
						<input type="text" id="correo" name="correo" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /[a-z0-9_.-]+@[a-z0-9]+\.[a-z]{2,}/, message:'Correo invalido'} })} 
						className="solicitarInput" placeholder="Correo" />
		                
                        {errors.telefono 
                	  	? <label className="solictarLabel text-danger" style={{fontSize:"22px"}}>{errors.telefono.message}</label> 
                	  	: <label className="solictarLabel">Telefono</label>}
						<input type="number" id="telefono" name="telefono" 
						ref={register({required: {value:true,message:'Este campo es obligatorio'},pattern: {value: /^[0-9 ]*$/, message:'Solo numeros'} })} 
						className="solicitarInput" placeholder="Telefono" />

                        <label className="solictarLabel">Descrpicion</label>
                        <textarea type="text" id="Descripcion" name="descripcion" 
                        	ref={register({required: {value:false}})} 
                        className="solicitarInput"  placeholder="Descripcion" />

                        <button disabled={activo} type="submit" variant="contained" color="secondary" >Enviar</button>
                    </form>    
                    {mensajeRespuesta(respuesta,"Mensaje",activo)}
                </div>
            </div>
        </row>
    )
}

export default SolicitarCuenta