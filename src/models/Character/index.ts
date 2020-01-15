export interface Character {
  id: string;
  name: string;
  characterType: string;
  hit_points: number;
  armor_class: number;
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
  initMod: number;
  tracker?: any;
}
