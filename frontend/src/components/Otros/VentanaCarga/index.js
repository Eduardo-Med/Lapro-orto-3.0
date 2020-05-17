import React from 'react'
import Imagen from '../../../images/PrestigiousSplendidKiskadee-mobile.gif'

function VentanaCarga() {
    return (
        <div style={{background:"#4da6c1", width:"100%", height:"100vh"}}>
            <img src={Imagen} alt="Pantalla" className="FondoDeCarga"/>
        </div>
    )
}

export default VentanaCarga
