import React from 'react';
import { Grid, Header, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SettingsNav = () => {
	return (
		<Grid.Column width={4}>
          <Menu vertical>
            <Header icon="user" attached inverted color="grey" content="Perfil" />
            <Menu.Item as={NavLink} to="/configuracion/perfil">Datos personales</Menu.Item>
          </Menu>
          <Grid.Row />
          <Menu vertical>
            <Header
              icon="settings"
              attached
              inverted
              color="grey"
              content="Mi cuenta"
            />
          </Menu>
        </Grid.Column>
	)
}

export default SettingsNav;