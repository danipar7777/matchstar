import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';

import PartidoDashboard from '../../features/partido/PartidoDashboard/PartidoDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import PartidoForm from '../../features/partido/PartidoForm/PartidoForm';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import PartidoDetailedPage from '../../features/partido/PartidoDetailed/PartidoDetailedPage';
import HomePage from '../../features/home/HomePage';
import ModalManager from '../../features/modals/ModalManager';
import NotFound from '../../app/layout/NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route path="/(.+)" render={() => (
          <div>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route exact path="/partidos" component={PartidoDashboard} />
                <Route path="/partidos/:id" component={PartidoDetailedPage} />
                <Route path="/editar/:id" component={PartidoForm} />
                <Route path="/perfil/:id" component={UserDetailedPage} />
                <Route path="/configuracion" component={SettingsDashboard} />
                <Route path="/crearPartido" component={PartidoForm} />
                <Route path="/error" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
