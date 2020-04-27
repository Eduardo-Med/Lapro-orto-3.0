import React from 'react'
import foto from './default.jpg'
import './styles.css'

export default function infoPerfil({usuario, editar}) {
    return (
        <div className="perfil-container row mb-5">
        <div className="perfil-image-container">
            <img className="perfil-image" src={foto} alt="profile"/>
        </div>
        <div className="perfil-info-container mt-5">
            <div className="row">
                <div className="column">
                    <div className="info-container row mr-3">
                        <h1 className="textt">Nombre: </h1>
                        <p className="info mt-2">{usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}</p>
                    </div>


                    <div className="info-container row mr-3">
                        <h1 className="textt" >Dirección: </h1>
                        <p className="info mt-2 ">{usuario.direccion}</p>
                    </div>

                </div>

                <div className="column">
                    <div className="info-container row">
                        <h1 className="textt">Correo: </h1>
                        <p className="info mt-2">{usuario.correo}</p>
                    </div>

                    <div className="info-container row">
                        <h1 className="textt">Telefono: </h1>
                        <p className="info mt-2">(52) {usuario.telefono}</p>
                    </div>
                </div>
              
              
            </div>
            <div className="row">
                    <button className="btn btn-dark" data-toggle="modal" data-target="#modalEdicion">Editar</button>
            </div>
        </div>
    </div>
    )
}
