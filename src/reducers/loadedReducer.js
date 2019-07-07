import  actionTypes  from '../actions';

const initial = {
   players: [],
   encounters: [],
}

export const loadedReducer = (state = initial, action) => {
   switch (action.type) {
      case actionTypes.CLEAR_CAMPAIGN:
         return {}
      case actionTypes.LOAD_CAMPAIGN:

         console.log("AYY", action.campaign)
         return {
            ...action.campaign,
         }
      case actionTypes.SAVE_PLAYER:
         let players = state.players.filter(
            player => player.id !== action.player.id
         )
         return {
            ...state,
            players: [...players, action.player],
         }
      case actionTypes.DELETE_PLAYER:
         return {
            ...state,
            players: [state.players.filter(player => player.id !== action.id)],
         }
      case actionTypes.SAVE_ENCOUNTER:
         let encounters = state.encounters.filter(
            encounter => encounter.id !== action.encounter.id
         )
         return {
            ...state,
            encounters: [...encounters, action.encounter],
         }
      case actionTypes.DELETE_ENCOUNTER:
         return {
            ...state,
            encounters: [
               ...state.encounters.filter(
                  encounter => encounter.id !== action.id
               ),
            ],
         }
      case actionTypes.CREATE_ENCOUNTER:
         return {
            ...state,
            encounters: [...state.encounters, action.encounter],
         }
      default:
         return state
   }
}
