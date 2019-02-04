import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignedInMenu = ({signOut, profile, auth}) => {
	return (
		<Menu.Item position="right">
          <Image avatar spaced="right" src={profile.photoURL || '/assets/user.png'} />
          <Dropdown pointing="top left" text={profile.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/crearPartido" text="Crear Partido" icon="plus" />
              <Dropdown.Item as={Link} to={`/perfil/${auth.uid}`} text="Mi perfil" icon="user" />
              <Dropdown.Item as={Link} to="/configuracion" text="Editar perfil" icon="settings" />
              <Dropdown.Item onClick={signOut} text="Cerrar sesión" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
	)
}

export default SignedInMenu;