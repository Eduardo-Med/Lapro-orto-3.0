import React from 'react';
import * as Usuario from './api/Usuario'

it("Api testing obtener usuarios", async function(){
  var data = await Usuario.getUsers();
  expect(data.data.clientes[0].idCliente).toEqual(11)
})

