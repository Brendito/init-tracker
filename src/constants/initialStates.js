const action = {
  name: "",
  desc: "",
  attack_bonus: "",
  damage_dice: "",
  average_damage: "",
  average_damage_bonus: "",
  bonus_damage_dice: "",
  bonus_damage_type: "",
  damage_type: "",
  range: ""
};

const specialAbility = {
  name: "",
  desc: ""
};

const npc = {
  id: "",
  name: "",
  characterType: "",
  hit_points: 0,
  armor_class: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  wisdom: 0,
  intelligence: 0,
  charisma: 0,
  initMod: 0,
  tracker: {},
  size: "",
  hit_dice: "",
  type: "",
  subtype: "",
  alignment: "",
  speed: "",
  strength_save: 0,
  dexterity_save: 0,
  constitution_save: 0,
  wisdom_save: 0,
  intellect_save: 0,
  special_abilities: [],
  actions: [],
  legendary_actions: [],
  charisma_save: 0,
  damage_vulnerabilities: "",
  damage_resistances: "",
  damage_immunities: "",
  condition_immunities: "",
  senses: "",
  languages: "",
  challenge_rating: "",
  dataType: "",
  xp: 0
};

export const initialStates = {
  action,
  specialAbility,
  npc
};
