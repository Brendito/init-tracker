import actionTypes from '../actions'

const initialState = {
   list: [],
   id: '',
}
export const trackerReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.LOAD_ENCOUNTER:
         const loadedEncounter = action.encounter
         console.log(state.campaign)
         return {
            ...loadedEncounter,
         }
      case actionTypes.ADD_TO_TRACKER:
         return {
            ...state,
            list: [...action.characters],
         }
      default:
         return state
   }
}
