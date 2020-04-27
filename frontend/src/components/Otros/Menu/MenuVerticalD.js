const urlBase = "http://localhost:3000"

export const menuData = [
  {
    label: "Inicio",
    url: `${urlBase}`,
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
    label: "Incio",
    url: `${urlBase}/dentista`,
    icono: 'home'
  },
  {
    label: "Perfil",
    url: `${urlBase}/dentista/perfil`,
    icono: 'user'
  },
  {
    label: "Aparatos",
    url: `${urlBase}/aparatos`,
    icono: 'tooth'
  },
  {
    label: "Hacer Orden",
    url: `${urlBase}/dentista/orden`,
    icono: 'clipboard-list'
  },
  {
    label: "Imprimir Ticket",
    url: `${urlBase}/dentista/ticket`,
    icono: 'dollar-sign'

  },
];

export const menuDataAdmin = [
  {
    label: "Inicio",
    url: `${urlBase}/admin`,
    icono: 'home'
  },
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
