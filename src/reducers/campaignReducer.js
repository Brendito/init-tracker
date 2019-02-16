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
        console.log(action.campaign.id, "===", campaign.id);
        return campaign.id !== action.campaign.id;
      });
      console.log(savedCampaigns);
      return {
        ...state,
        savedCampaigns: [...savedCampaigns, action.campaign]
      };
    case types.LOAD_CAMPAIGN:
      let loaded = state.savedCampaigns.filter(
        campaign => campaign.id === action.campaignId
      );
      console.log(loaded[0]);
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
        case charTypes.NPC:
          let npcs = state.loadedCampaign.characters.npcs.filter(
            char => char.id !== action.char.id
          );
          return {
            ...state,
            loadedCampaign: {
              ...state.loadedCampaign,
              characters: {
                ...state.loadedCampaign.characters,
                npcs: [...npcs.concat(action.char)]
              }
            }
          };
        case charTypes.ENEMY:
          let enemies = state.loadedCampaign.characters.enemies.filter(
            char => char.id !== action.char.id
          );
          return {
            ...state,
            loadedCampaign: {
              ...state.loadedCampaign,
              characters: {
                ...state.loadedCampaign.characters,
                enemies: [...enemies.concat(action.char)]
              }
            }
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
