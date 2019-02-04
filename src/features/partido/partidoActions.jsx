import { toastr } from 'react-redux-toastr';
import { FETCH_MATCHS } from './partidoConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { createNewPartido } from '../../app/common/util/helpers';
import moment from 'moment';
import firebase from '../../app/config/firebase';
import compareAsc from 'date-fns/compare_asc'

export const createPartido = (partido) => {
	return async (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const user = firestore.auth().currentUser;
		const photoURL = getState().firebase.profile.photoURL;
		let newPartido = createNewPartido(user, photoURL, partido);
		try {
			let createdPartido = await firestore.add(`partidos`, newPartido);
			await firestore.set(`partido_attendee/${createdPartido.id}_${user.uid}`, {
				partidoId: createdPartido.id,
				userUid: user.uid,
				partidoDate: partido.date,
				host: true
			})
			toastr.success('Success!', 'El partido se ha creado correctamente')
		} catch(error) {
			toastr.error('Oops', 'Algo ha ido mal')
		}
	}
}

export const updatePartido = (partido) => {
	return async (dispatch, getState) => {
		dispatch(asyncActionStart());
		const firestore = firebase.firestore();
		partido.date = moment(partido.date).toDate();
		try {
			let partidoDocRef = firestore.collection('partidos').doc(partido.id);
			let dateEqual = compareAsc(getState().firestore.ordered.partidos[0].date.toDate(), partido.date);
			if(dateEqual !== 0) {
				let batch = firestore.batch();
				await batch.update(partidoDocRef, partido);

				let partidoAttendeeRef = firestore.collection('partido_attendee');
				let partidoAttendeeQuery = await partidoAttendeeRef.where('partidoId', '==', partido.id);
				let partidoAttendeeQuerySnap = await partidoAttendeeQuery.get();

				for(let i=0; i<partidoAttendeeQuerySnap.docs.length; i++) {
					let partidoAttendeeDocRef = await firestore.collection('partido_attendee').doc(partidoAttendeeQuerySnap.docs[i].id);
					await batch.update( partidoAttendeeDocRef, {
						partidoDate: partido.date
					})
				}
				await batch.commit();
			} else {
				await partidoDocRef.update(partido);
			}
			dispatch(asyncActionFinish());
			toastr.success('Success!', 'El partido se ha actualizado')
		} catch(error) {
			dispatch(asyncActionFinish());
			toastr.error('Oops', 'Algo ha ido mal')
		}
	}
}

export const cancelToggle = (cancelled, partidoId) => async(dispatch, getState, {getFirestore}) => {
	const firestore = getFirestore();
	const message = cancelled ? '¿Seguro que quieres cancelar el partido?' : 'Vas a reactivar el partido - ¿Estás seguro?';
	try {
		toastr.confirm(message, {
			onOk: () =>
				firestore.update(`partidos/${partidoId}`, {
					cancelled: cancelled
				})
		})
	} catch(error) {
		console.log(error)
	}
}

export const getPartidosForDashboard = (lastPartido) => async(dispatch, getState) => {
	let today = new Date(Date.now());
	const firestore = firebase.firestore();
	const partidosRef = firestore.collection('partidos');
	try {
		dispatch(asyncActionStart());
		let startAfter = lastPartido && await firestore.collection('partidos').doc(lastPartido.id).get();
		let query;

		lastPartido ? query = partidosRef.where('date', '>=', today).orderBy('date').startAfter(startAfter).limit(2)
		: query = partidosRef.where('date', '>=', today).orderBy('date').limit(2)

		let querySnap = await query.get();

		if(querySnap.docs.length === 0) {
			dispatch(asyncActionFinish())
			return querySnap;
		}

		let partidos = [];

		for(let i=0; i<querySnap.docs.length; i++) {
			let evt = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
			partidos.push(evt);
		}
		dispatch({type: FETCH_MATCHS, payload: {partidos}});
		dispatch(asyncActionFinish());
		return querySnap;
	} catch(error) {
		console.log(error)
		dispatch(asyncActionError());
	}
}