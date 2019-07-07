import actionTypes from '../actions'

const initialState = {
   campaigns: [],
   npcs: [],
}

export const savedReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.CREATE_CAMPAIGN:
         return {
            ...state,
            campaigns: [...state.campaigns, action.campaign],
         }
      case actionTypes.SAVE_CAMPAIGN:
         if (action.campaign) {
            let savedCampaigns = state.campaigns.filter(campaign => {
               return campaign.id !== action.campaign.id
            })
            return {
               ...state,
               campaigns: [...savedCampaigns, action.campaign],
            }
         } else {
            return state
         }
      case actionTypes.SAVE_NPC:
         let npcs = state.npcs.filter(char => char.id !== action.npc.id)
         return {
            ...state,
            npcs: [...npcs.concat(action.npc)],
         }
      case actionTypes.DELETE_NPC:
         return {
            ...state,
            npcs: [...state.npcs.filter(npc => npc.id !== action.id)],
         }
      default:
         return state
   }
}
