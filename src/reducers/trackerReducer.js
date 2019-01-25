import * as types from "../constants/actionTypes";

const initialState = {
  list: []
};
export const tracker = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_TRACKER:
    // TODO: Edge case when adding character with same information
      let list = [...state.list];
      const char = action.char;
      char.key = list.length + 1;
      list.push(char);
      return {
        ...state,
        list: list
      };
    case types.REMOVE_FROM_TRACKER:
      return {
        ...state,
        list: state.list.filter(el => el.key !== action.key)
      };
    default:
      return state;
  }
};
