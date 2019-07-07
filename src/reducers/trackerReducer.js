import { trackerActionTypes } from '../actions/trackerActions'

const initialState = {
   list: [],
   id: '',
}
export const trackerReducer = (state = initialState, action) => {
   switch (action.type) {
      case trackerActionTypes.LOAD_ENCOUNTER:
         const loadedEncounter = action.encounter
         console.log(state.campaign)
         return {
            ...loadedEncounter,
         }
      case trackerActionTypes.ADD_TO_TRACKER:
         return {
            ...state,
            list: [...action.characters],
         }
      default:
         return state
   }
}
