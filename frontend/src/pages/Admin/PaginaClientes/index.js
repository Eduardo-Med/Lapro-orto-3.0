import React, { useEffect, useState } from "react";
import ListaClientes from "../../../components/Admin/ListaClientes";
import NuevoCliente from "../../../components/Admin/NuevoCliente";
import Plantilla from "../../../components/Otros/PlantillaPagina"
import EditarCliente from "../../../components/Dentista/EditarPerfil";

import { CircularProgress } from "@material-ui/core";
import { useCookies } from 'react-cookie';

import { getUsers, addUsers, deleteUsers,updateUser } from "../../../api/users";
import {accessControlAdmin} from '../../../helpers/accessControlAdmin'


const PaginaClientes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [cookies] = useCookies(['cookie-name']);
  const [idCliente, setIdCliente] = useState()

  useEffect(() => {
    async function loadUsuarios() {
      const response = await getUsers();
      if (response.status === 200) {
        setClientes(response.data.clientes);
        setIsLoading(true);
      }
    }
    loadUsuarios();
  }, []);

  function handleDeleteCliente(id) {
    deleteUsers(id,cookies.token);
    window.location.reload(false);
  }

  function enviarDatosFormulario(datos) {
    addUsers(datos,cookies.token);
    window.location.reload(false);
  }

  function abrirVentanaEdicion(id){
    setIdCliente(id)
  }

  async function editarPer(data){
    const response = await updateUser(data)
    console.log(response)
    window.location.reload(false);
  }

  const renderClientes = () => {
    if (isLoading) {
      return (
        <Plantilla contenido={[
          <div className="row OrdenesTitulos">
          <h3 className="textt">Lista de Clientes</h3>
          </div>,
          <button data-toggle="modal" data-target="#modalRegistro" className="registration-btn">Nuevo Cliente</button>,
          <ListaClientes users={clientes} editar={abrirVentanaEdicion} eliminar={handleDeleteCliente} />,
          <NuevoCliente enviar={enviarDatosFormulario}/>,
          idCliente ? <EditarCliente usuario={clientes[idCliente]} editar={editarPer}/> : null
        ]}>
        </Plantilla>      
      )
    } else {
      return <CircularProgress color="secondary" />;
    }
  };

  return (
    <div>
       {renderClientes()}
    </div>
  );
};

export default accessControlAdmin(PaginaClientes);