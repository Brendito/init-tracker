/* eslint-disable no-useless-escape */
import { skills } from "../constants/npcInformation";
import { Npc } from "../models";

export function savingThrows(npc: Npc) {
  const list = [];
  if (npc.strength_save) {
    list.push(`Str +${npc.strength_save}`);
  }
  if (npc.dexterity_save) {
    list.push(`Dex +${npc.dexterity_save}`);
  }
  if (npc.constitution_save) {
    list.push(`Con +${npc.constitution_save}`);
  }
  if (npc.wisdom_save) {
    list.push(`Wis +${npc.wisdom_save}`);
  }
  if (npc.intelligence_save) {
    list.push(`Int +${npc.intelligence_save}`);
  }
  if (npc.charisma_save) {
    list.push(`Cha +${npc.charisma_save}`);
  }
  if (list.length > 0) {
    return list.join(", ");
  } else {
    return null;
  }
}

export function skillList(npc: Npc) {
  const list: Array<any> = [];
  skills.forEach(skill => {
    if (npc[skill.id]) {
      list.push(`${skill.name} +${npc[skill.id]}`);
    }
  });
  if (list.length > 0) {
    return list.join(", ");
  } else {
    return null;
  }
}

export function spellList(ability: any) {
  const arr = ability.split(/(?:\•)/g);
  return arr;
}
