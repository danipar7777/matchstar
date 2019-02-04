import { createReducer } from '../../app/common/util/reducerUtil';
import { CREATE_MATCH, UPDATE_MATCH, DELETE_MATCH , FETCH_MATCHS} from './partidoConstants';

const initialState = [];

export const createPartido = (state, payload) => {
	return [...state, Object.assign({}, payload.partido)]
}

export const updatePartido = (state, payload) => {
	return [...state.filter(partido => partido.id !== payload.partido.id), Object.assign({}, payload.partido)]
}

export const deletePartido = (state, payload) => {
	return [...state.filter(partido => partido.id !== payload.partidoId)]
}

export const fetchPartidos = (state, payload) => {
	return payload.partidos
}

export default createReducer(initialState, {
	[CREATE_MATCH]: createPartido,
	[UPDATE_MATCH]: updatePartido,
	[DELETE_MATCH]: deletePartido,
	[FETCH_MATCHS]: fetchPartidos
})