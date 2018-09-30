import { AsyncStorage } from 'react-native';
import { PERMISSION, LASTIMAGE, CLEARIMAGE, TOGGLECAMERA } from '../action/types';
import { Camera } from 'expo';

const initialState = {
	hasCameraPermission: null,
	lastImage: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PERMISSION:
			try {
				AsyncStorage.setItem('hasCameraPermission', 'true')
				return {
					...state,
					hasCameraPermission: true
				};
			}
			catch (err) {
				console.log(err);
				return state;
			}
		case LASTIMAGE:
			return {
				...state,
				lastImage: action.payload
			}
		case CLEARIMAGE:
			return {
				...state,
				lastImage: null
			}
		default:
			return state;
	}
}
