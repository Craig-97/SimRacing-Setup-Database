import {
    DELETE_DRIVER_PENDING,
    DELETE_DRIVER_SUCCESS,
    DELETE_DRIVER_ERROR
  } from '../../actions/driverActions';
  
  export const deleteDriverReducer = (state, action) => {
    switch (action.type) {
      case DELETE_DRIVER_PENDING:
        return {
          ...state,
          CRUD: {
            type: 'DELETE',
            pending: true
          }
        };
      case DELETE_DRIVER_SUCCESS:
        return {
          ...state,
          CRUD: {
            type: null,
            pending: false,
            message: `${action.payload.name} Successfully Deleted`
          }
        };
      case DELETE_DRIVER_ERROR:
        return {
          ...state,
          CRUD: {
            type: 'DELETE',
            pending: false,
            error: action.error
          }
        };
      default:
        return state;
    }
  }
  
  export const deleteDriverFromStore = (state, action) => {
    return {
      ...state,
      data: state.data.filter(driver => driver._id !== action.payload._id)
    };
  };
  