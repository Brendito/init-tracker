import { ActionCreatorsMapObject } from "redux";

import { Encounter, Npc, Player } from "../models";

export const trackerActionTypes = {
  ADD_TO_TRACKER: "ADD_TO_TRACKER",
  REMOVE_FROM_TRACKER: "REMOVE_FROM_TRACKER",
  LOAD_ENCOUNTER: "LOAD_ENCOUNTER"
};

export interface TrackerActionCreators extends ActionCreatorsMapObject {
  loadEncounter: (encounter: Encounter) => void;
  addToTracker: (characters: Array<Npc & Player>) => void;
}

export const trackerActionCreators: TrackerActionCreators = (() => {
  const loadEncounter = (encounter: Encounter) => ({
    type: trackerActionTypes.LOAD_ENCOUNTER,
    encounter
  });

  const addToTracker = (characters: Array<Npc & Player>) => ({
    type: trackerActionTypes.ADD_TO_TRACKER,
    characters
  });

  return {
    loadEncounter,
    addToTracker
  };
})();
