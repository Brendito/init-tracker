import { loadedActionTypes } from '../actions/loadedActions'

const initial = {
   players: [],
   encounters: [],
}

export const loadedReducer = (state = initial, action) => {
   switch (action.type) {
      case loadedActionTypes.CLEAR_CAMPAIGN:
         return {}
      case loadedActionTypes.LOAD_CAMPAIGN:
         return {
            ...action.campaign,
         }
      case loadedActionTypes.SAVE_PLAYER:
         let players = state.players.filter(
            player => player.id !== action.player.id
         )
         return {
            ...state,
            players: [...players, action.player],
         }
      case loadedActionTypes.DELETE_PLAYER:
         return {
            ...state,
            players: [state.players.filter(player => player.id !== action.id)],
         }
      case loadedActionTypes.SAVE_ENCOUNTER:
         let encounters = state.encounters.filter(
            encounter => encounter.id !== action.encounter.id
         )
         return {
            ...state,
            encounters: [...encounters, action.encounter],
         }
      case loadedActionTypes.DELETE_ENCOUNTER:
         return {
            ...state,
            encounters: [
               ...state.encounters.filter(
                  encounter => encounter.id !== action.id
               ),
            ],
         }
      case loadedActionTypes.CREATE_ENCOUNTER:
         return {
            ...state,
            encounters: [...state.encounters, action.encounter],
         }
      default:
         return state
   }
}
