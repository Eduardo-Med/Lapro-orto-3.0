import React from "react";
import SideBar from "../Menu/SideBar";
import Header from "../Menu/Header";

function PlantillaPagina({contenido}) {
  return (
    <div className="container-fluid">
      <input type="checkbox" id="check"></input>
      <Header />
      <div className="row contenido">
        <SideBar/>
        <div className="col-12 contenidoPrincipal">
            {contenido}
        </div>
      </div>
      <div className="row footer"></div>
    </div>
  );
}

export default PlantillaPagina;
