const urlBase = ""

export const menuData = [
  {
    label: "Inicio",
    url: `${urlBase}/`,
    icono: 'home'
  },
  {
    label: "Aparatos",
    url: `${urlBase}/aparatos`,
    icono: 'tooth'
  },
];

export const menuDataDentista = [
  {
    label: "Perfil",
    url: `${urlBase}/11/perfil`,
    icono: 'user'
  },
  {
    label: "Aparatos",
    url: `${urlBase}/aparatos`,
    icono: 'tooth'
  },
  {
    label: "Hacer Orden",
    url: `${urlBase}/11/orden`,
    icono: 'clipboard-list'
  },
  {
    label: "Imprimir Ticket",
    url: `${urlBase}/11/ticket`,
    icono: 'dollar-sign'

  },
];

export const menuDataAdmin = [
  {
    label: "Aparatos",
    url: `${urlBase}/admin/aparatos`,
    icono: 'tooth'
  },
  {
    label: "Ordenes",
    url: `${urlBase}/admin/ordenes`,
    icono: 'clipboard-list'
  },
  {
    label: "Clientes",
    url: `${urlBase}/admin/clientes`,
    icono: 'users'
  },
];
