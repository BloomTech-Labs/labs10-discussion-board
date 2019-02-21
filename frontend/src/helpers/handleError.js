// action creators
import { displayError } from '../store/actions/index.js';

const handleError = (err, errAction, stripeError) => dispatch => {
  let errMsg;
  if (stripeError) {
    errMsg = err.response.data.err.raw.message
  } else {
    errMsg = err.response ? err.response.data.error : err.toString();
  }
  dispatch({ type: errAction, payload: errMsg });
  return displayError(errMsg)(dispatch);
};

export default handleError;
