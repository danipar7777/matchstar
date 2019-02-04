import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import PartidoDetailedHeader from './PartidoDetailedHeader';
import PartidoDetailedInfo from './PartidoDetailedInfo';
import PartidoDetailedSidebar from './PartidoDetailedSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToPartido, cancelGoingToPartido } from '../../user/userActions';

const mapState = (state, ownProps) => {

	let partido = {};

	if(state.firestore.ordered.partidos && state.firestore.ordered.partidos[0]) {
		partido = state.firestore.ordered.partidos[0]
	}

	return {
		requesting: state.firestore.status.requesting,
		partido,
		loading: state.async.loading,
		auth: state.firebase.auth,
	}
}

const actions = {
	goingToPartido,
	cancelGoingToPartido
}

class PartidoDetailedPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			initialLoading: true
		}
	}

	async componentDidMount() {
		const {firestore, match} = this.props;
		let partido = await firestore.get(`partidos/${match.params.id}`);
		if(!partido.exists) {
			toastr.error('Not found', 'Este no es el partido que estabas buscando');
			this.props.history.push('/error');
		}
		await firestore.setListener(`partidos/${match.params.id}`);
		this.setState({
			initialLoading: false
		})
	}

	async componentWillUnmount() {
		const {firestore, match} = this.props;
		await firestore.unsetListener(`partidos/${match.params.id}`);
	}

	render() {
		const {partido, auth, goingToPartido, cancelGoingToPartido, loading, requesting, match} = this.props;
		const attendees = partido && partido.attendees && objectToArray(partido.attendees);
		const isHost = partido.hostUid === auth.uid;
		const isGoing = attendees && attendees.some(a => a.id === auth.uid);
		const loadingPartido = requesting[`partidos/${match.params.id}`];

		if(loadingPartido || this.state.initialLoading) return <LoadingComponent inverted={true} />

		return (
			<Grid>
				<Grid.Column width={10}>
					<PartidoDetailedHeader partido={partido} loading={loading} isHost={isHost} isGoing={isGoing} goingToPartido={goingToPartido} cancelGoingToPartido={cancelGoingToPartido} />
					<PartidoDetailedInfo partido={partido} />
				</Grid.Column>
				<Grid.Column width={6}>
					<PartidoDetailedSidebar attendees={attendees} />
				</Grid.Column>
			</Grid>
		)
	}
}

export default compose(
	withFirestore,
	connect(mapState, actions)
)(PartidoDetailedPage);