import { LOGIN } from './types';

export const Login = (user) => async (dispatch) => dispatch({
	type: LOGIN,
	payload: user
})

