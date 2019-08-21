import {SEARCH_USER} from '../actions/types';

const initialState = {};

export default function (state = initialState, action){

	switch(action.type){
		case SEARCH_USER:
			const {name, lastName, code, career} = action.user;
			return {
				...state,
				name,
				lastName,
				code,
				career 
			}
		default:
			return state;
	}
}

