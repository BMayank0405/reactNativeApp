import { PERMISSION } from './types';

export const CamPermissionAction = hasCameraPermission => async (dispatch) => dispatch({
	type: PERMISSION,
	payload: hasCameraPermission
})
