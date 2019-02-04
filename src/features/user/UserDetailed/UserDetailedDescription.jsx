import React from 'react';
import { Grid, Header, Segment } from "semantic-ui-react";
import format from 'date-fns/format';

const UserDetailedDescription = ({profile}) => {
	let createdAt;
    let dateOfBirth;
	if(profile.createdAt) {
		createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY');
	}
    if(profile.dateOfBirth) {
        dateOfBirth = format(profile.dateOfBirth.toDate(), 'D MMM YYYY');
    }
	return (
		<Grid.Column width={12}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Header icon='smile' content='Sobre mi'/>
                        <p>Género: <strong>{profile.gender || 'Sin especificar'}</strong></p>
                        <p>Fecha de nacimiento <strong>{dateOfBirth || 'Sin especificar'}</strong></p>
                        <p>Miembro desde: <strong>{createdAt}</strong></p>
                        <p>{profile.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Grid.Column>
	)
}

export default UserDetailedDescription;