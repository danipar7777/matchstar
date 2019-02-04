import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
	openModal
}

const mapState = (state) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
})

class NavBar extends Component {

	handleSignIn = () => {
		this.props.openModal('LoginModal')
	}

	handleRegister = () => {
		this.props.openModal('RegisterModal')
	}

	handleSignOut = () => {
		this.props.firebase.logout();
		this.props.history.push('/');
	}

	render() {
		const {auth, profile} = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;
		return (
			<Menu inverted fixed="top">
				<Container>
					<Menu.Item as={Link} to="/partidos" header>
						<img src="/assets/logoStar.png" alt="logo" />
						MatchStar
					</Menu.Item>
					<Menu.Item as={NavLink} to="/partidos" name="Partidos" />
					<Menu.Item as={NavLink} to={`/perfil/${auth.uid}`} name="Perfil" />
					{authenticated &&
					<Menu.Item>
						<Button as={Link} to="/crearPartido" floated="right" positive inverted content="Crear Partido" />
					</Menu.Item>}
					{authenticated ? (
						<SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
					) : (
						<SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
					)}
				</Container>
			</Menu>
		)
	}
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));