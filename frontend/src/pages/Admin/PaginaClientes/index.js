import React, { useEffect, useState } from "react";
import ListaClientes from "../../../components/Admin/ListaClientes";
import NuevoCliente from "../../../components/Admin/NuevoCliente";
import Plantilla from "../../../components/Otros/PlantillaPagina"
import EditarCliente from "../../../components/Dentista/EditarPerfil";

import { useCookies } from 'react-cookie';

import { getUsers, addUsers, deleteUsers,updateUser }   from "../../../api/Usuario";
import { enviarCorreoConfirmacion }   from "../../../api/SendEmail";
import {accessControlAdmin} from '../../../helpers/accessControlAdmin'
import {AlertaConfirmacion} from '../../../helpers/AlertaEspera'
import VentanaCargaInformacion from "../../../components/Otros/VentanaCargaInformacion";


/**
 *Componente funcional que renderiza la pagina de clientes y sus componentes
 *
 * @constructor
 * 
 * @returns Codigo HTML
 */
function PaginaClientes(){
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [cookies] = useCookies(['cookie-name']);
  const [idCliente, setIdCliente] = useState()

  useEffect(() => {
    /**
    *Funcion para agregar caragr los usuarios del servidor
    *
    */
    async function loadUsuarios() {
      const response = await getUsers();
      if (response.status === 200) {
        setClientes(response.data.clientes);
        setIsLoading(true);
      }
    }
    loadUsuarios();
  }, []);


  /**
  *Funcion para eliminar usuario
  * @param {Integer} id id del usuario a eliminar
  */
  async function handleDeleteCliente(id) {
    const response = await deleteUsers(id,cookies.token);
    AlertaConfirmacion(response.status, "Eliminando Usuario" )
    if(response.status === 200 || response.status ===201){
      window.location.reload(false);
    }
  }

  /**
  *Funcion para enviar los datos del formulario al servidor
  * @param {Object} datos objecto que contiene los datos del formulario
  */
  async function enviarDatosFormulario(datos) { 
    const response = await addUsers(datos,cookies.token);
    AlertaConfirmacion(response.status, "Enviando Inforamacion" )
    if(response.status === 200 || response.status ===201){
     await enviarCorreoConfirmacion(datos)
      window.location.reload(false);
    }

  }


  function abrirVentanaEdicion(id){
    setIdCliente(id)
  }
 
  /**
  *Funcion para enviar los datos del formulario de edicion al servidor
  * @param {Object} data objecto que contiene los datos del formulario de edicion
  */
  async function editarPer(data){
    const response = await updateUser(data,cookies.token)
    AlertaConfirmacion(response.status, "Actualizando Inforamacion" )
    if(response.status === 200 || response.status ===201){
      window.location.reload(false);
    }
  }

  const renderClientes = () => {
    if (isLoading) {
      return (
        <Plantilla contenido={[
          <div className="row OrdenesTitulos">
          <h3 className="textt ml-5">Lista de Clientes</h3>
          </div>,
          <button data-toggle="modal" data-target="#modalRegistro" className="ml-5 registration-btn">Nuevo Cliente</button>,
          <ListaClientes users={clientes} editar={abrirVentanaEdicion} eliminar={handleDeleteCliente} />,
          <NuevoCliente enviar={enviarDatosFormulario}/>,
          <EditarCliente usuario={clientes[idCliente]} editar={editarPer} ocultar={false}/>
        ]}>
        </Plantilla>      
      )
    } else {
      return <VentanaCargaInformacion/>;
    }
  };

  return (
    <div>
       {renderClientes()}
    </div>
  );
};

export default accessControlAdmin(PaginaClientes);