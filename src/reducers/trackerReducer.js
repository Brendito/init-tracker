import * as types from '../constants/actionTypes'

const initialState = {
   list: [],
   id: '',
}
export const trackerReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.LOAD_ENCOUNTER:
        const loadedEncounter = action.encounter
        console.log(state.campaign)
         return {
            ...loadedEncounter
         }
      default:
         return state
   }
}
