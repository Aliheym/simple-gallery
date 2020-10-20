import {
  ADD_COLLECTION,
  LOAD_COLLECTIONS,
  LOAD_COLLECTIONS_SUCCESS,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
} from '../constants/collections';

const initialState = {
  items: [],
  status: 'idle',
};

export default function collectionReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case LOAD_COLLECTIONS:
      return {
        ...state,
        status: 'loading',
      };
    case LOAD_COLLECTIONS_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        items: payload,
      };
    case ADD_COLLECTION:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case UPDATE_COLLECTION:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    case DELETE_COLLECTION:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
      };
    default:
      return state;
  }
}
