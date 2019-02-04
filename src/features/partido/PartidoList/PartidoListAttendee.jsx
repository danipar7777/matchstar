import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PartidoListAttendee extends Component {
	render() {
		const {attendee} = this.props;
		return (
			<List.Item>
				<Image as={Link} to={`/perfil/${attendee.id}`} size="mini" circular src={attendee.photoURL} />
			</List.Item>
		)
	}
}

export default PartidoListAttendee;