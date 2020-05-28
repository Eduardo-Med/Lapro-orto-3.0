const urlBase = ""

export const menuData = [
  {
    label: "Inicio",
    url: `/`,
    icono: 'home'
  },
  {
    label: "Aparatos",
    url: `/aparatos`,
    icono: 'tooth'
  },
];

export const menuDataDentista = [
  {
    label: "Perfil",
    url: `/perfil`,
    icono: 'user'
  },
  {
    label: "Aparatos",
    url: `/aparatos`,
    icono: 'tooth'
  },
  {
    label: "Hacer Orden",
    url: `/orden`,
    icono: 'clipboard-list'
  },
  {
    label: "Imprimir Ticket",
    url: `/ticket`,
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
