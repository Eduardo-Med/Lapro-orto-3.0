import React from 'react'
import Ventas from '../../../components/Dentista/Ventas'
import Plantilla from "../../../components/Otros/PlantillaPagina"

function PaginaPagos() {
    return (
      <Plantilla contenido={[
        <Ventas/>
      ]}></Plantilla>
    )
}

export default PaginaPagos
