// action creators
import { displayError } from '../store/actions/index.js';

const handleError = (err, errAction) => dispatch => {
	const errMsg =  err.response ? err.response.data.error : err.toString();
	dispatch({ type: errAction, payload: errMsg });
	return displayError(errMsg)(dispatch);
};

export default handleError;
