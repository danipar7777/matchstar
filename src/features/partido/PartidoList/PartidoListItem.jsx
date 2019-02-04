import React, { Component } from 'react';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import PartidoListAttendee from './PartidoListAttendee';
import { objectToArray } from '../../../app/common/util/helpers';

class PartidoListItem extends Component {
	render() {
    const {partido} = this.props;
		return (
			<Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={partido.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/partidos/${partido.id}`} >{partido.title}</Item.Header>
                <Item.Description>
                  Creado por <Link to={`/perfil/${partido.hostUid}`}>{partido.hostedBy}</Link>
                </Item.Description>
                {partido.cancelled &&
                <Label style={{top: '-40px'}} ribbon="right" color="red" content="El partido ha sido cancelado" />}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(partido.date.toDate(), 'dddd Do MMMM')} at {format(partido.date.toDate(), 'HH:mm')} |
            <Icon name="marker" /> {partido.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
          {partido.attendees && objectToArray(partido.attendees).map((attendee) => (
            <PartidoListAttendee key={attendee.id} attendee={attendee} />
          ))}
          </List>
        </Segment>
        <Segment clearing>
        	<span>{partido.description}</span>
          <Button as={Link} to={`/partidos/${partido.id}`} color="yellow" floated="right" content="Ver" />
        </Segment>
      </Segment.Group>
		)
	}
}

export default PartidoListItem;