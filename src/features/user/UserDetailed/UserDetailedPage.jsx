import React, {Component} from 'react';
import { Grid } from "semantic-ui-react";
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPartidos from './UserDetailedPartidos';
import { userDetailedQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserPartidos } from '../userActions';

const mapState = (state, ownProps) => {
    let userUid = null;
    let profile = {};

    if(ownProps.match.params.id === state.auth.uid) {
        profile = state.firebase.profile
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
        userUid = ownProps.match.params.id;
    }

    return {
        profile: profile,
        userUid: userUid,
        partidos: state.partidos,
        partidosLoading: state.async.loading,
        auth: state.firebase.auth,
        requesting: state.firestore.status.requesting,
    }
}

const actions = {
    getUserPartidos,
}

class UserDetailedPage extends Component {

    async componentDidMount() {
        let user = await this.props.firestore.get(`users/${this.props.match.params.id}`);
        if(!user.exists) {
            toastr.error('Not found', 'This is not the user you are looking for');
            this.props.history.push('/error');
        }
        await this.props.getUserPartidos(this.props.userUid);
    }

    render() {
    	const {profile, auth, match, requesting, partidos, partidosLoading} = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = requesting[`users/${match.params.id}`];

        if(loading) return <LoadingComponent inverted={true} />

        return (
        	<Grid>
        		<UserDetailedHeader profile={profile} />
        		<UserDetailedDescription profile={profile} />
        		<UserDetailedSidebar profile={profile} isCurrentUser={isCurrentUser} />
        		<UserDetailedPartidos partidos={partidos} partidosLoading={partidosLoading} />
        	</Grid>
        );
    }
}

export default compose(
	connect(mapState, actions),
	firestoreConnect((auth, userUid, match) => userDetailedQuery(auth, userUid, match))
)(UserDetailedPage);