import { Character, Action, SpecialAbility } from "../../models";

export interface Npc extends Character {
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  speed: string;
  strength_save: number;
  dexterity_save: number;
  constitution_save: number;
  wisdom_save: number;
  intellect_save: number;
  charisma_save: number;
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  challenge_rating: string;
  // TODO: Fix these anys
  special_abilities?: any;
  actions?: any;
  legendary_actions?: any;
  dataType: string;
  xp: number;
  hit_dice: string;
  [type: string]: any;
}
