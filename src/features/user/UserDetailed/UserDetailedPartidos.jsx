import React from 'react';
import { Card, Grid, Header, Image, Segment } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const UserDetailedMatchs = ({matchs, matchsLoading}) => {
	return (
		<Grid.Column width={12}>
            <Segment attached loading={matchsLoading}>
               <Header icon='calendar' content='Partidos'/>
                <Card.Group itemsPerRow={5}>
                {matchs && matchs.map((match) => (
                    <Card as={Link} to={`/partidos/${match.id}`} key={match.id} >
                        <Image src={`/assets/categoryImages/${match.category}.jpg`}/>
                        <Card.Content>
                            <Card.Header textAlign='center'>
                                {match.title}
                            </Card.Header>
                            <Card.Meta textAlign='center'>
                               <div>{format(match.date && match.date.toDate(), 'DD MMM YYYY')}</div>
                               <div>{format(match.date && match.date.toDate(), 'h:mm A')}</div>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                ))}
                </Card.Group>
            </Segment>
        </Grid.Column>
	)
}

export default UserDetailedMatchs;