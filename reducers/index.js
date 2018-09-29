//this file is meant to combine all the reducers created.
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'
import CamReducer from './CamReducer'

export default combineReducers({
	user: AuthReducer,
	camera: CamReducer
});
