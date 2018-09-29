import { AsyncStorage } from 'react-native';
import { LOGIN, LOGOUT, GETDETAIL } from '../action/types';


export default (state = {}, action) => {
	switch (action.type) {

		case LOGIN:
			try {
				AsyncStorage.setItem('userDetail', JSON.stringify(action.payload))
				return {
					...state,
					userDetail: action.payload
				}
			}
			catch (err) {
				console.log(err);
				return state;
			}

		case LOGOUT:
			try {
				AsyncStorage.removeItem('userDetail')
				return {
					...state,
					userDetail: {}
				};
			}
			catch (err) {
				console.log(err);
				return state;
			}
		case GETDETAIL:
			return {
				...state,
				userDetail: action.payload
			}
		default:
			return state;
	}
}
