import { LASTIMAGE, CLEARIMAGE } from './types';
export const LastImage = (url) => async (dispatch) => dispatch({
	type: LASTIMAGE,
	payload: url
})