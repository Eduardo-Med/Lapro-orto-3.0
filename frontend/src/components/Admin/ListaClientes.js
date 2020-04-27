import React from "react";


export default ({ users, eliminar,editar }) => {
  return (
    <div className="row">
      <table class="table table-hover table-dark tablaUsuarios">
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
                 <td align="right"><button className="btn btn-info btn-sm" data-toggle="modal" data-target="#modalEdicion" onClick={()=>editar(index)}>Editar</button><button className="btn btn-dark btn-sm" onClick={() => eliminar(user.idCliente)}>Eliminar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
