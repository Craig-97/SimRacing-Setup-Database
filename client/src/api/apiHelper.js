import axios from 'axios';
export const API_BASE = 'http://localhost:4000/api';

export const apiGET = (dispatch, pendingAction, successAction, errorAction, url)  => {
    dispatch(pendingAction());
    axios
      .get(`${API_BASE}/${url}`)
      .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(successAction(res.data[url]));
            return res.data[url];
      })
      .catch(error => {
        dispatch(errorAction(error));
    })
  };