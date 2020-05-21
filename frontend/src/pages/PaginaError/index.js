import React from 'react'
import Error from '../../components/Otros/Error'
import Pagina from '../../components/Otros/PlantillaPagina'
import Login from '../../components/Login'
function PaginaError() {
    return (
        <Pagina contenido={
            [
            <Error/>,
            <Login/>
            ]
       }></Pagina>    
    )
}

export default PaginaError
