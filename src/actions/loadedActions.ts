import { ActionCreatorsMapObject } from "redux";

import { Encounter, Player } from "../models";

export const loadedActionTypes = {
  SAVE_PLAYER: "SAVE_PLAYER",
  DELETE_PLAYER: "DELETE_PLAYER",
  CLEAR_CAMPAIGN: "CLEAR_CAMPAIGN",
  SAVE_ENCOUNTER: "SAVE_ENCOUNTER",
  CREATE_ENCOUNTER: "CREATE_ENCOUNTER",
  DELETE_ENCOUNTER: "DELETE_ENCOUNTER"
};

export interface LoadedActionCreators extends ActionCreatorsMapObject {
  clearCampaign: () => void;
  savePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
  createEncounter: (encounter: Encounter) => void;
  deleteEncounter: (id: string) => void;
  saveEncounter: (encounter: Encounter) => any;
}

export const loadedActionCreators: LoadedActionCreators = (() => {
  const clearCampaign = () => ({
    type: loadedActionTypes.CLEAR_CAMPAIGN
  });

  const savePlayer = (player: Player) => ({
    type: loadedActionTypes.SAVE_PLAYER,
    player
  });

  const deletePlayer = (id: string) => ({
    type: loadedActionTypes.DELETE_PLAYER,
    id
  });

  const createEncounter = (encounter: Encounter) => ({
    type: loadedActionTypes.CREATE_ENCOUNTER,
    encounter
  });

  const deleteEncounter = (id: string) => ({
    type: loadedActionTypes.DELETE_ENCOUNTER,
    id
  });

  // TODO: Add models
  const saveEncounter = (encounter: Encounter) => ({
    type: loadedActionTypes.SAVE_ENCOUNTER,
    encounter
  });

  return {
    clearCampaign,
    savePlayer,
    deletePlayer,
    createEncounter,
    deleteEncounter,
    saveEncounter
  };
})();
