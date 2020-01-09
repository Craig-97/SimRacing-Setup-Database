import {
  FETCH_GAMES_PENDING,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_ERROR,
  ADD_GAME_SUCCESS,
  UPDATE_GAME_SUCCESS,
  DELETE_GAME_SUCCESS
} from '../actions/gameActions';

import reduceReducers from 'reduce-reducers';
import addGameReducer from './addGameReducer';
import deleteGameReducer, { deleteGameFromStore } from './deleteGameReducer';
import updateGameReducer, { updateGameToStore } from './updateGameReducer';

const initialState = {
  data: [],
  CRUD: {
    type: null,
    pending: false,
    message: null,
    error: null
  }
};

let fetchGameReducer = function(state, action) {
  switch (action.type) {
    case FETCH_GAMES_PENDING:
      return {
        ...state,
        CRUD: {
          type: 'READ',
          pending: true
        }
      };
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        CRUD: {
          type: null,
          pending: false
        }
      };
    case ADD_GAME_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case UPDATE_GAME_SUCCESS:
      return updateGameToStore(state, action);
    case DELETE_GAME_SUCCESS:
      return deleteGameFromStore(state, action);
    case FETCH_GAMES_ERROR:
      return {
        ...state,
        CRUD: {
          type: 'READ',
          pending: false,
          error: action.error
        }
      };
    default:
      return state;
  }
};

let gameReducer = reduceReducers(
  initialState,
  fetchGameReducer,
  addGameReducer,
  updateGameReducer,
  deleteGameReducer
);

export const getGames = state => state.games.data;
export const gamesCRUDPending = state => state.games.CRUD.pending;
export const gamesCRUDError = state => state.games.CRUD.error;
export const gamesCRUDMessage = state => state.games.CRUD.message;
export const gamesCRUDType = state => state.games.CRUD.type;

export default gameReducer;
