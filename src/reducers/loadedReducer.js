import * as types from '../constants/actionTypes'

const initial = {
   players: [],
   encounters: [],
}

export const loadedReducer = (state = initial, action) => {
   switch (action.type) {
      case types.CLEAR_CAMPAIGN:
         return {}
      case types.LOAD_CAMPAIGN:
         return {
            ...action.campaign,
         }
      case types.SAVE_PLAYER:
         let players = state.players.filter(
            player => player.id !== action.player.id
         )
         return {
            ...state,
            players: [...players, action.player],
         }
      case types.DELETE_PLAYER:
         return {
            ...state,
            players: [state.players.filter(player => player.id !== action.id)],
         }
      case types.SAVE_ENCOUNTER:
         let encounters = state.encounters.filter(
            encounter => encounter.id !== action.encounter.id
         )
         return {
            ...state,
            encounters: [...encounters, action.encounter],
         }
      case types.DELETE_ENCOUNTER:
         return {
            ...state,
            encounters: [
               ...state.encounters.filter(
                  encounter => encounter.id !== action.id
               ),
            ],
         }
      case types.CREATE_ENCOUNTER:
         return {
            ...state,
            encounters: [...state.encounters, action.encounter],
         }
      default:
         return state
   }
}
