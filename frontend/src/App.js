import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';


import Clientes from './pages/Admin/PaginaClientes'
import Aparatos from './pages/Admin/PaginaAparatos'
import Ordenes from './pages/Admin/PaginaOrdenes'
import HacerOrden from './pages/Dentista/HacerOrden'
import { useCookies } from 'react-cookie';

import Perfil from './pages/Dentista/PaginaPerfil'
import Home from './pages/Home'
import PaginaPago from './pages/Dentista/PaginaPagos'
import Ticket from './components/Otros/Ticket'

const componentRelleno = () => <div>En Proceso :) </div>

/**
 * Clase donde se generan todas las rutas de la pagina.
 * Es la clase en donde se llaman todos los componentes
 * 
 * @class App
 * @constructor
 */


const App = () => {
const [cookies] = useCookies(['cookie-name']);
  return(
      <Router>
        <div>
          <Route exact path="/" render={() => <Home cookies={cookies}/>} />
          <Route path="/aparatos" exact render={() => <Aparatos needNuevaAparato={false}/>} />
          <Route path={`/${cookies.userId}`}  exact component={componentRelleno} />
          <Route path={`/${cookies.userId}/perfil`} exact  render={() => <Perfil cookies={cookies}/>} />
          <Route path={`/${cookies.userId}/orden`} exact component={HacerOrden} />
          <Route path={`/admin`} exact component={componentRelleno} />
          <Route path={`/admin/aparatos`} exact render={() => <Aparatos needNuevaAparato={true}/>} />
          <Route path={`/admin/clientes`} exact component={Clientes} />
          <Route path={`/admin/ordenes`} exact component={Ordenes} />
          <Route path={`/${cookies.userId}/ticket`} exact component={PaginaPago} />
          <Route path={`/${cookies.userId}/ticket/imprimir`} exact component={Ticket} />
        </div>
      </Router>
  )   
        
}
export default withCookies(App);