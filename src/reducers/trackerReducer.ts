import { trackerActionTypes } from "../actions";

export interface TrackerInitialState {
  list: Array<any>;
  id: string;
}
const initialState: TrackerInitialState = {
  list: [],
  id: ""
};

export const trackerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case trackerActionTypes.LOAD_ENCOUNTER:
      const loadedEncounter = action.encounter;
      return {
        ...loadedEncounter
      };
    case trackerActionTypes.ADD_TO_TRACKER:
      return {
        ...state,
        list: [...action.characters]
      };
    default:
      return state;
  }
};
