import React from 'react'
import Permiso from '../../components/Otros/Permiso'
import Pagina from '../../components/Otros/PlantillaPagina'
import Login from '../../components/Login'

function PaginaPermiso() {
    return (
        <Pagina contenido={
            [
            <Permiso/>,
            <Login/>
            ]
       }></Pagina>    
    )
}

export default PaginaPermiso
