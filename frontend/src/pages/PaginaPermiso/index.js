import React from 'react'
import Permiso from '../../components/Otros/Permiso'
import Pagina from '../../components/Otros/PlantillaPagina'

function PaginaPermiso() {
    return (
        <Pagina contenido={
            [
            <Permiso/>,
            ]
       }></Pagina>    
    )
}

export default PaginaPermiso
