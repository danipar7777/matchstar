import { SubmissionError } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { closeModal } from '../modals/modalActions';

export const login = (creds) => {
	return async(dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		try {
			await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
			dispatch(closeModal())
		} catch(error) {
			throw new SubmissionError({
				_error: 'Error de login'
			})
		}
	}
}

export const registerUser = (user) => async(dispatch, getState, {getFirebase, getFirestore}) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	try {
		let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
		await createdUser.updateProfile({displayName: user.displayName});

		//Creo nuevo perfil en firestore
		let newUser = {
			displayName: user.displayName,
			createdAt: firestore.FieldValue.serverTimestamp()
		};
		await firestore.set(`users/${createdUser.uid}`, {...newUser});
		dispatch(closeModal());
		toastr.success('Success', 'Usuario creado correctamente');
	} catch(error) {
		throw new SubmissionError({
			_error: error.message
		})
	}
}