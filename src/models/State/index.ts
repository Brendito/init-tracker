import { Campaign, Encounter, Npc, Player } from "../";

export interface State {
  saved: Saved;
  loaded: Loaded;
  // FIXME: Update Tracker Model
  tracker?: any;
}

export interface Saved {
  campaigns: Array<Campaign>;
  npcs: Array<Npc>;
}

export interface Loaded {
  players: Array<Player>;
  encounters: Array<Encounter>;
  id: string;
  campaignName: string;
}
