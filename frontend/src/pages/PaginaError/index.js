import React from 'react'
import Error from '../../components/Otros/Error'
import Pagina from '../../components/Otros/PlantillaPagina'
function PaginaError() {
    return (
        <Pagina contenido={
            [
            <Error/>,
            ]
       }></Pagina>    
    )
}

export default PaginaError
