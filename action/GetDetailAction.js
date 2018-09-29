import { GETDETAIL } from './types';
import { AsyncStorage } from 'react-native';
export const GetDetail = (user) => async (dispatch) => dispatch({
	type: GETDETAIL,
	payload: user
});

