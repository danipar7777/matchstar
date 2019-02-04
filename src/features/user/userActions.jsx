import moment from 'moment';
import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import { FETCH_MATCHS } from '../partido/partidoConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import firebase from '../../app/config/firebase';

export const updateProfile = (user) => async(dispatch, getState, {getFirebase}) => {
	const firebase = getFirebase();
	const {isLoaded, isEmpty, ...updatedUser} = user;
	if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
		updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
	}

	try {
		await firebase.updateProfile(updatedUser);
		toastr.success('Success', 'Perfil actualizado correctamente')
	} catch(error) {
		console.log(error);
	}
}

export const uploadProfileImage = (file, fileName) => async(dispatch, getState, {getFirebase, getFirestore}) => {
	const imageName = cuid();
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	const path = `${user.uid}/user_images`;
	const options = {
		name: imageName
	};

	try {
		dispatch(asyncActionStart());
		//Upload the file to firebase storage
		let uploadedFile = await firebase.uploadFile(path, file, null, options);
		//Get url of image
		let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
		//Check userdoc
		let userDoc = await firestore.get(`users/${user.uid}`);
		//Check if user has photo, if not update profile with new image
		if(!userDoc.data().photoURL) {
			await firebase.updateProfile({
				photoURL: downloadURL
			});
			await user.updateProfile({
				photoURL: downloadURL
			})
		}
		//Add the new photo to photos collection
		await firestore.add({
			collection: "users",
			doc: user.uid,
			subcollections: [{collection: 'photos'}]
		}, {
			name: imageName,
			url: downloadURL
		})
		dispatch(asyncActionFinish());
	} catch(error) {
		console.log(error);
		dispatch(asyncActionError());
		throw new Error('Problem uploading photo');
	}
}

export const goingToPartido = (partido) => async(dispatch, getState) => {
	dispatch(asyncActionStart());
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const profile = getState().firebase.profile;
	const attendee = {
		going: true,
		joinDate: Date.now(),
		photoURL: profile.photoURL || '/assets/user.png',
		displayName: profile.displayName,
		host: false
	}
	try {
		let partidoDocRef = firestore.collection('partidos').doc(partido.id);
		let partidoAttendeeDocRef = firestore.collection('partido_attendee').doc(`${partido.id}_${user.uid}`);

		await firestore.runTransaction(async(transaction) => {
			await transaction.get(partidoDocRef);
			await transaction.update(partidoDocRef, {
				[`attendees.${user.uid}`]: attendee
			})
			await transaction.set(partidoAttendeeDocRef, {
				partidoId: partido.id,
				userUid: user.uid,
				partidoDate: partido.date,
				host: false
			})
		})
		dispatch(asyncActionFinish());
		toastr.success('Success', 'Te has apuntado al partido correctamente');
	} catch(error) {
		console.log(error);
		dispatch(asyncActionError());
		toastr.error('Oops', 'Algo ha ido mal')
	}
}

export const cancelGoingToPartido = (partido) => async(dispatch, getState, {getFirestore}) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;
	try {
		await firestore.update(`partidos/${partido.id}`, {
			[`attendees.${user.uid}`]: firestore.FieldValue.delete()
		})
		await firestore.delete(`partido_attendee/${partido.id}_${user.uid}`);
		toastr.success('Success', 'Te has desapuntado del partido correctamente');
	} catch(error) {
		console.log(error);
		toastr.error('Oops', 'Algo ha ido mal')
	}
}

export const getUserPartidos = (userUid) => async(dispatch, getState) => {
	dispatch(asyncActionStart());
	const firestore = firebase.firestore();
	let partidosRef = firestore.collection('partido_attendee');
	let query = partidosRef.where('userUid', '==', userUid).orderBy('partidoDate', 'desc');
	try{
		let querySnap = await query.get();
		let partidos = [];

		for(let i= 0; i<querySnap.docs.length; i++) {
			let evt = await firestore.collection('partidos').doc(querySnap.docs[i].data().partidoId).get();
			partidos.push({...evt.data(), id: evt.id})
		}

		dispatch({type: FETCH_MATCHS, payload: {partidos}})
		
		dispatch(asyncActionFinish());
	} catch(error) {
		console.log(error);
		dispatch(asyncActionError());
	}
}