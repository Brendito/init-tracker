import { loadedActionTypes } from "../actions";
import { Encounter, Player } from "../models";

export interface InitialLoadedState {
  players: Array<Player>;
  encounters: Array<Encounter>;
}

const initialLoadedState: InitialLoadedState = {
  players: [],
  encounters: []
};

export const loadedReducer = (state = initialLoadedState, action: any) => {
  switch (action.type) {
    case loadedActionTypes.CLEAR_CAMPAIGN:
      return {};
    case loadedActionTypes.SAVE_PLAYER:
      let players = state.players.filter(
        (player: Player) => player.id !== action.player.id
      );
      return {
        ...state,
        players: [...players, action.player]
      };
    case loadedActionTypes.DELETE_PLAYER:
      return {
        ...state,
        players: [
          state.players.filter((player: Player) => player.id !== action.id)
        ]
      };
    case loadedActionTypes.SAVE_ENCOUNTER:
      let encounters = state.encounters.filter(
        (encounter: Encounter) => encounter.id !== action.encounter.id
      );
      return {
        ...state,
        encounters: [...encounters, action.encounter]
      };
    case loadedActionTypes.DELETE_ENCOUNTER:
      return {
        ...state,
        encounters: [
          ...state.encounters.filter(
            (encounter: Encounter) => encounter.id !== action.id
          )
        ]
      };
    case loadedActionTypes.CREATE_ENCOUNTER:
      return {
        ...state,
        encounters: [...state.encounters, action.encounter]
      };
    default:
      return state;
  }
};
