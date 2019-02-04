import React from 'react';
import { Button, Grid, Segment } from "semantic-ui-react";
import {Link} from 'react-router-dom';

const UserDetailedSidebar = ({isCurrentUser}) => {
	return (
		<Grid.Column width={4}>
            <Segment>
            {isCurrentUser &&  (
                <Button as={Link} to="/configuracion" color='yellow' fluid basic content='Editar perfil'/>
            )}
            </Segment>
        </Grid.Column>
	)
}

export default UserDetailedSidebar;