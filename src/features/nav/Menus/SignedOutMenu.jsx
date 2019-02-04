import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({signIn, register}) => {
	return (
		<Menu.Item position="right">
			<Button onClick={signIn} inverted size='large' content="Login" />
			<Button onClick={register} inverted size='large' content="Registro" style={{ marginLeft: '0.5em' }} />
		</Menu.Item>
	)
}

export default SignedOutMenu;