import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import {createPartido, updatePartido, cancelToggle } from '../partidoActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const mapState = (state) => {

  let partido = {}

  if (state.firestore.ordered.partidos && state.firestore.ordered.partidos[0]) {
    partido = state.firestore.ordered.partidos[0];
  }

  return {
    initialValues: partido,
    partido: partido,
    loading: state.async.loading
  }
}

const actions = {
  createPartido,
  updatePartido,
  cancelToggle
}

const category = [
    {key: 'futbol', text: 'Fútbol', value: 'futbol'},
    {key: 'baloncesto', text: 'Baloncesto', value: 'baloncesto'},
    {key: 'hockey', text: 'Hockey', value: 'hockey'},
    {key: 'balonmano', text: 'Balonmano', value: 'balonmano'},
    {key: 'waterpolo', text: 'Waterpolo', value: 'waterpolo'},
];

const validate = combineValidators({
  title: isRequired({message: 'El título del partido es obligatorio'}),
  category: isRequired({message: 'Selecciona un deporte'}),
  description: isRequired({message: 'Describe con detalle el partido'}),
  city: isRequired('Lugar'),
  date: isRequired('Fecha')
});

class PartidoForm extends Component {
  
  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`partidos/${match.params.id}`);
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`partidos/${match.params.id}`);
  }

  onFormSubmit = async values => {
    if(this.props.initialValues.id) {
      await this.props.updatePartido(values);
      this.props.history.goBack();
    } else{
      this.props.createPartido(values);
      this.props.history.push('/partidos');
    }
  }

	render() {
    const {invalid, submitting, pristine, partido, cancelToggle, loading} = this.props;
		return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="yellow" content="Detalles Partido" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" type="text" component={TextInput} placeholder="Ponle un nombre a tu partido" />
              <Field name="category" type="text" component={SelectInput} options={category} placeholder="Deporte" />
              <Field name="description" type="text" rows={3} component={TextArea} placeholder="Descripción del partido" />
              <Header sub color="yellow" content="Más detalles" />
              <Field name="city" type="text" component={TextInput} placeholder="Lugar del partido" />
              <Field name="date" type="text" component={DateInput} dateFormat='YYYY-MM-DD HH:mm' timeFormat="HH:mm" showTimeSelect placeholder="Fecha y hora del partido" />
              <Button loading={loading} disabled={invalid || submitting || pristine} positive type="submit">
                Crear
              </Button>
              <Button disabled={loading} onClick={this.props.history.goBack} type="button">Cancelar</Button>
              {partido.id &&
              <Button
                onClick={() => cancelToggle(!partido.cancelled, partido.id)}
                type="button"
                color={partido.cancelled ? 'green' : 'red'}
                floated="right"
                content={partido.cancelled ? 'Reactivar Partido' : 'Cancelar Partido'}
              />}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
		)
	}
}

export default withFirestore(connect(mapState, actions)(reduxForm({form: 'partidoForm', enableReinitialize: true, validate})(PartidoForm)));