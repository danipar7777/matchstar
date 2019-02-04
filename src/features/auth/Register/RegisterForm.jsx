import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';

const actions = {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('nombre'),
  email: isRequired('email'),
  password: isRequired('contraseña')
})

const RegisterForm = ({handleSubmit, registerUser, error, invalid, submitting}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)} >
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Nombre"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Contraseña"
          />
          {error && <Label basic color="red">{error}</Label>}
          <Button disabled={invalid || submitting} fluid size="large" color="yellow">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form: 'RegisterForm', validate})(RegisterForm));