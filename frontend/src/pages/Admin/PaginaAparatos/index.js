import React, {useState, useEffect} from 'react'
import NuevoAparato from '../../../components/Admin/NuevoAparato'
import {addAparatos,getAparatos} from "../../../api/Aparato";
import Pagina from "../../../components/Otros/PlantillaPagina";
import { CircularProgress} from "@material-ui/core";
import './styles.css'

/**
 *Componente funcional que renderiza una tarjeta con la informacion de la orden
 *
 * @constructor
 * 
 * @param {Boolean} needNuevaAparato variable para saber si se necesita el formulario de nuevo aparato
 * @returns Codigo HTML
 */
const PaginaAparatos = ({needNuevaAparato}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [aparatos, setAparatos] = useState([]);

    
    useEffect(() => {
        /**
        *Funcion para cargar los aparatos desde el servidor cada ves que se entra a la pagina
        *
        */
        async function loadAparatos() {
          const response = await getAparatos();
          if (response.status === 200) {
            setAparatos(response.data.aparatos);
            setIsLoading(false);
          }
        }
        loadAparatos();
      }, []);


    /**
    *Funcion para mandar los datos del formulario al servidor
    * @param {Object} datos objecto con la informacion del formulario
    * @param {Object} datosImagen objecto con la informacion de la imagen que se agrego en el formulario
    */  
    async function enviarDatosFormulario(datos,datosImagen){
        const formData = new FormData();
        formData.append('imagen',datosImagen.imagen,datos.titulo);
        formData.append('descripcion',datos.descripcion);
        await addAparatos(formData)
        window.location.reload(false);
      }

    
      
    const renderAparatos=()=>{
        if(!isLoading){
            return (
               <div className="body-fake">

                   {
                    needNuevaAparato ?
                    <button type="button" className="btn btn-primary my-4" data-toggle="modal" data-target=".bd-example-modal-lg">Agregar Nuevo Aparato</button>
                    :
                    null
                    }
                   <div className="cardds-container">
                    {
                        aparatos.map((aparato, index)=>(
                            <div className="roww" key={index} >
                                <div className="cardd">
                                    <div className="cardd-info-container">
                                        <h2>{aparato.titulo}</h2>
                                        <p>
                                            {aparato.descripcion}
                                        </p>
                                    </div>
                                    <div className="cardd-image-container">
                                        <img className="cardd-image" src={`data:image/png;base64,${Buffer.from(aparato.imagen).toString("base64")}`} alt={aparato.titulo}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                   </div>
               </div>
            )
        }else{
            return <CircularProgress />
        }
    }
    

    const renderNuevoAparato=() => {
        if(needNuevaAparato){
          return  (<div>
                    <NuevoAparato enviar={enviarDatosFormulario}/>
                    </div>)
        }else{
             return null;
        }
    }


    return (
        <Pagina contenido={
            [
                renderAparatos(),
                renderNuevoAparato()
            ]
       }></Pagina>  
       
    )
}

export default PaginaAparatos

