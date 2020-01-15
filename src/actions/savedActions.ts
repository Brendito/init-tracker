import { ActionCreatorsMapObject } from "redux";

import { Campaign, Npc } from "../models";

export const savedActionTypes = {
  CREATE_CAMPAIGN: "CREATE_CAMPAIGN",
  LOAD_CAMPAIGN: "LOAD_CAMPAIGN",
  SAVE_CAMPAIGN: "SAVE_CAMPAIGN",
  SAVE_NPC: "SAVE_NPC",
  DELETE_NPC: "DELETE_NPC"
};

export interface SavedActionCreators extends ActionCreatorsMapObject {
  saveCampaign: (campaign: Campaign) => void;
  createCampaign: (campaign: any) => void;
  loadCampaign: (campaign: Campaign) => void;
  saveNPC: (npc: Npc) => void;
  deleteNPC: (id: string) => void;
}

export const savedActionCreators: SavedActionCreators = (() => {
  const saveCampaign = (campaign: Campaign) => ({
    type: savedActionTypes.SAVE_CAMPAIGN,
    campaign
  });

  const createCampaign = (campaign: any) => ({
    type: savedActionTypes.CREATE_CAMPAIGN,
    campaign
  });

  const loadCampaign = (campaign: Campaign) => ({
    type: savedActionTypes.LOAD_CAMPAIGN,
    campaign
  });

  const saveNPC = (npc: Npc) => ({
    type: savedActionTypes.SAVE_NPC,
    npc
  });

  const deleteNPC = (id: string) => ({
    type: savedActionTypes.DELETE_NPC,
    id
  });

  return {
    saveCampaign,
    createCampaign,
    loadCampaign,
    saveNPC,
    deleteNPC
  };
})();
