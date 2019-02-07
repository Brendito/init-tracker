import * as types from "../constants/actionTypes";
import { v4 } from 'node-uuid';

const initialState = {
  list: []
};
export const tracker = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_TRACKER:
      // TODO: Edge case when adding character with same information
      // action.char.id = v4();
      return {
        ...state,
        list: [...state.list, action.char]
      };
    case types.REMOVE_FROM_TRACKER:
      return {
        ...state,
        list: state.list.filter(el => el.id !== action.id)
      };
    case types.EDIT_CHARACTER:
      let charArr = [...state.list];
      let updated = charArr.map((el, i) => {
        if (el.id === action.char.id) {
          return action.char;
        }
        return el;
      })
      return {
        ...state,
        list: updated
      }
    default:
      return state;
  }
};
