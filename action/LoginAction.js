import { LOGIN } from './types';

export const Login = () => async (dispatch) => {

	try {
		const result = await Expo.Google.logInAsync({
			androidClientId: '117306357056-vejioaduaf6s3b4qavcqb8jerdj5659c.apps.googleusercontent.com',
			scopes: ['profile', 'email'],
		});
		if (result.type === 'success') {
			return dispatch({
				type: LOGIN,
				payload: result.user
			})

		} else {
			console.log('cancelled');
			return { cancelled: true };
		}
	} catch (e) {
		console.log(`error: ${e}`);
		return { error: true };
	}

};

