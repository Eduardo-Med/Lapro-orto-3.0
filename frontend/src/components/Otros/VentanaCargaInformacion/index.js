import React from 'react'

function VentanaCargaInformacion() {
    return (
        <div className="container-fluid FondoDeCarga ml-5">
            <div className="row">
            <img  src="https://media.giphy.com/media/26BRMNZa0mmBNUaaY/giphy.gif" alt="Pantalla" />
            </div>
            <div className="row">
            <div style={{width: '540px'}} class="alert alert-primary text-center" role="alert">
                    <p>Cargando Informacion Porfavor Espere</p>
                    <p>Esto puede tardar unos segundos</p>
                </div>
            </div>
    
        </div>
    )
}

export default VentanaCargaInformacion
