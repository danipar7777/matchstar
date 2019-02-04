import React from 'react';
import { Button, Header, Image, Item, Label, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const partidoImageStyle = {
    filter: 'brightness(30%)'
};

const partidoImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const PartidoDetailedHeader = ({partido, isHost, isGoing, goingToPartido, cancelGoingToPartido, loading}) => {
  let partidoDate;
  if(partido.date) {
    partidoDate = partido.date.toDate();
  }
	return (
		<Segment.Group>
          <Segment basic attached="top" style={{ padding: '0' }}>
            <Image src={`/assets/categoryImages/${partido.category}.jpg`} fluid style={partidoImageStyle} />
    
            <Segment basic style={partidoImageTextStyle}>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Header
                      size="huge"
                      content={partido.title}
                      style={{ color: 'white' }}
                    />
                    <p>{format(partidoDate, 'dddd Do MMMM')}</p>
                    <p>
                      Creado por <strong>{partido.hostedBy}</strong>
                    </p>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Segment>
    
          <Segment attached="bottom">
          {!isHost && (
            <div>
            {isGoing ? (
              <Button onClick={() => cancelGoingToPartido(partido)} >Cancelar mi plaza</Button>
            ) : (
              <Button loading={loading} onClick={() => goingToPartido(partido)} color="yellow">Apuntarme</Button>
            )}

            {partido.cancelled && !isHost &&
            <Label size="large" color="red" content="Este partido ha sido cancelado" />}
            </div>
          )}
          {isHost && (
            <Button as={Link} to={`/editar/${partido.id}`} color="orange">
              Editar Partido
            </Button>
          )}
          </Segment>
        </Segment.Group>
	)
}

export default PartidoDetailedHeader;