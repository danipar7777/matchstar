import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment';
import DateInput from "../../../app/common/form/DateInput";
import RadioInput from "../../../app/common/form/RadioInput";

class BasicPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Información personales' />
                <Form onSubmit={handleSubmit(updateProfile)} >
                    <Form.Group inline>
                    	<label>Género: </label>
                    	<Field
                    		name="gender"
                    		type="radio"
                    		value="masculino"
                    		label="Masculino"
                    		component={RadioInput}
                    	/>
                    	<Field
                    		name="gender"
                    		type="radio"
                    		value="femenino"
                    		label="Femenino"
                    		component={RadioInput}
                    	/>
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Fecha de nacimiento'
                        dateFormat='YYYY-MM-DD'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode="select"
                        maxDate={moment().subtract(18, 'years')}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Actualizar perfil'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false})(BasicPage);