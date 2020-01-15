import { Character } from "../Character";

export interface Player extends Character {
  playerName: string;
  characterRace: string;
  characterClass: string;
  characterLevel: number;
}
