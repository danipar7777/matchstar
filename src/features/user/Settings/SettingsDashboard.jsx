import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import DatosPage from './DatosPage';
import { updateProfile } from '../userActions';

const actions = {
	updateProfile
}

const mapState = (state) => ({
	user: state.firebase.profile
})

const SettingsDashboard = ({user, updateProfile}) => {
	return (
		<Grid>
			<Grid.Column width={12}>
				<Switch>
					<Redirect exact from="/configuracion" to="/configuracion/perfil" />
					<Route path="/configuracion/perfil" render={() => <DatosPage updateProfile={updateProfile} initialValues={user} />} />
				</Switch>
			</Grid.Column>
			<Grid.Column width={4}>
				<SettingsNav />
			</Grid.Column>
		</Grid>
	)
}

export default connect(mapState, actions)(SettingsDashboard);