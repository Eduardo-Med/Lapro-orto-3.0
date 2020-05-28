import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';


import Clientes from './pages/Admin/PaginaClientes'
import Aparatos from './pages/Admin/PaginaAparatos'

import HacerOrden from './pages/Dentista/HacerOrden'
import Perfil from './pages/Dentista/PaginaPerfil'
import Home from './pages/Home'
import PaginaError from './pages/PaginaError'
import PaginaPago from './pages/Dentista/PaginaPagos'
import Ticket from './components/Otros/Ticket'


import { useCookies } from 'react-cookie';


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
        <Switch>
          <Route exact path="/" render={() => <Home cookies={cookies}/>} />
          <Route path="/aparatos" exact render={() => <Aparatos needNuevaAparato={false}/>} />
          <Route path={`/${cookies.userId}/perfil`} exact  render={() => <Perfil cookies={cookies}/>} />
          <Route path={`/${cookies.userId}/orden`} exact component={HacerOrden} />
          <Route path={`/admin/aparatos`} exact render={() => <Aparatos needNuevaAparato={true}/>} />
          <Route path={`/admin/clientes`} exact component={Clientes} />
          <Route path={`/admin/ordenes`} exact render={() => <Perfil cookies={cookies}/>} />/>
          <Route path={`/${cookies.userId}/ticket`} exact component={PaginaPago} />
          <Route path={`/dentista/ticket/imprimir`} exact  render={() => <Ticket usuario={cookies}/>} />
          <Route path='*' component={PaginaError} />
        </Switch>
      </Router>
  )      
}
export default withCookies(App);
