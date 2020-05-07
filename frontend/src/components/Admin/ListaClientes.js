import React from "react";



 /**
 *Componente funcional para desplegar la lista de usuarios
 *@constructor
 *
 * @param {Object} users parametro que contiene los datos de los usuarios
 * @param {Function} eliminar funcion para eliminar un usuario
 * @param {Function} editar funcion para la edicion de usuario
 * @returns Codigo HTML con la tabla de los usuarios
 */
function ListaClientes ({ users, eliminar,editar }) {
  return (
    <div className="row">
      <table className="table table-hover table-dark tablaUsuarios">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user,index) =>( 
              <tr key={index}>
                 <td align="right">{user.nombre}</td>
                 <td align="right">{user.apellidoPaterno} {user.apellidoMaterno}</td>
                 <td align="right">{user.direccion}</td>
                 <td align="right">{user.telefono}</td>
                 <td align="right">{user.correo}</td>
                 <td align="right">
                    <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#modalEdicion" onClick={()=>editar(index)}>Editar</button>
                    <button className="btn btn-dark btn-sm" onClick={() => eliminar(user.idCliente)}>Eliminar</button>
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};


export default ListaClientes