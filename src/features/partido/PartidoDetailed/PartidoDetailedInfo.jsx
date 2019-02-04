import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

const PartidoDetailedInfo = ({partido}) => {
  let partidoDate;
  if(partido.created) {
    partidoDate = partido.date.toDate();
  }
	return (
		<Segment.Group>
          <Segment attached="top">
            <Grid>
              <Grid.Column width={1}>
                <Icon size="large" color="yellow" name="info" />
              </Grid.Column>
              <Grid.Column width={15}>
                <p>{partido.description}</p>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={1}>
                <Icon name="calendar" size="large" color="yellow" />
              </Grid.Column>
              <Grid.Column width={15}>
                <span>{format(partidoDate, 'dddd Do MMM')} at {format(partidoDate, 'h:mm A')}</span>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={1}>
                <Icon name="marker" size="large" color="yellow" />
              </Grid.Column>
              <Grid.Column width={11}>
                <span>{partido.city}</span>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
	)
}

export default PartidoDetailedInfo;