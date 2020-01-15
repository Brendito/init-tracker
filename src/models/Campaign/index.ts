import { Player, Encounter } from "../";

export interface Campaign {
  players: Array<Player>;
  encounters: Array<Encounter>;
  id: string;
  campaignName: string;
  // FIXME: Update to tracker model
  tracker: any;
}
