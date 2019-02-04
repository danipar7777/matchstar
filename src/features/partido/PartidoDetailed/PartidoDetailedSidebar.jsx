import React from 'react';
import { Label, List, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PartidoDetailedSidebar = ({attendees}) => {
	return (
		<div>
			<Segment
		        textAlign="center"
		        style={{ border: 'none' }}
		        attached="top"
		        secondary
		        inverted
		        color="yellow"
		      >
		        {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Persona apuntada' : 'Personas apuntadas'}
		      </Segment>
		      <Segment attached>
		        <List relaxed divided>
		          {attendees && attendees.map((attendee) => (
		          	<Item key={attendee.id} style={{ position: 'relative' }}>
		          		{attendee.host &&
			            <Label
			              style={{ position: 'absolute' }}
			              color="orange"
			              ribbon="right"
			            >
			              Host
			            </Label>}
			            <Item.Image size="tiny" src={attendee.photoURL} />
			            <Item.Content verticalAlign="middle">
			              <Item.Header as="h3">
			                <Link to={`/profile/${attendee.id}`}>{attendee.displayName}</Link>
			              </Item.Header>
			            </Item.Content>
			          </Item>
		          ))}
		        </List>
		      </Segment>
		</div>
	)
}

export default PartidoDetailedSidebar;