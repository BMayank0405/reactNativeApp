import { AsyncStorage } from 'react-native';
import { PERMISSION } from '../action/types';
import { Camera } from 'expo';

const initialState = {
	hasCameraPermission: null,
	type: Camera.Constants.Type.back,
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
		default:
			return state;
	}
}
