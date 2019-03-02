import * as types from "../constants/actionTypes";
import * as charTypes from "../constants/characterTypes";

const initialCampaignState = {
  loadedCampaign: {},
  savedCampaigns: []
};

export const campaign = (state = initialCampaignState, action) => {
  switch (action.type) {
    case types.CREATE_CAMPAIGN:
      return {
        ...state,
        savedCampaigns: [...state.savedCampaigns, action.campaign]
      };
    case types.CLEAR_CAMPAIGN:
      return {
        ...state,
        loadedCampaign: {}
      };
    case types.SAVE_CAMPAIGN:
      let savedCampaigns = state.savedCampaigns.filter(campaign => {
        return campaign.id !== action.campaign.id;
      });
      return {
        ...state,
        savedCampaigns: [...savedCampaigns, action.campaign]
      };
    case types.LOAD_CAMPAIGN:
      let loaded = state.savedCampaigns.filter(
        campaign => campaign.id === action.campaignId
      );
      return {
        ...state,
        loadedCampaign: loaded[0]
      };
    case types.SAVE_CHAR_TO_CAMPAIGN:
      switch (action.char.characterType) {
        case charTypes.PC:
          let players = state.loadedCampaign.characters.players.filter(
            char => char.id !== action.char.id
          );
          return {
            ...state,
            loadedCampaign: {
              ...state.loadedCampaign,
              characters: {
                ...state.loadedCampaign.characters,
                players: [...players.concat(action.char)]
              }
            }
          };
        case charTypes.FRIENDLY_NPC:
          let friendlyNpcs = state.loadedCampaign.characters.npcs.filter(
            char => char.id !== action.char.id
          );
          return {
            ...state,
            loadedCampaign: {
              ...state.loadedCampaign,
              characters: {
                ...state.loadedCampaign.characters,
                npcs: [...friendlyNpcs.concat(action.char)]
              }
            }
          };
        case charTypes.HOSTILE_NPC:
          let hostileNpcs = state.loadedCampaign.characters.npcs.filter(
            char => char.id !== action.char.id
          );
          return {
            ...state,
            loadedCampaign: {
              ...state.loadedCampaign,
              characters: {
                ...state.loadedCampaign.characters,
                npcs: [...hostileNpcs.concat(action.char)]
              }
            }
          };
        default:
          return state;
      }
    case types.DELETE_CHAR:
      switch (action.charType) {
        case charTypes.FRIENDLY_NPC:
         let npcs = state.loadedCampaign.characters.npcs.filter(npc => npc.id !== action.id)
          return {
            ...state,
            loadedCampaign: {
              ...state.loadedCampaign,
              characters: {
                ...state.loadedCampaign.characters,
                npcs: [...npcs]
              }
            }
          }
      }
    default:
      return state;
  }
};
