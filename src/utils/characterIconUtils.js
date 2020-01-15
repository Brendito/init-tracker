import React from "react";
import characterClasses from "../constants/characterClasses";
import {
  Barbarian,
  Bard,
  Cleric,
  Druid,
  Fighter,
  Monk,
  Monster,
  Paladin,
  Ranger,
  Rogue,
  Sorcerer,
  Warlock,
  Wizard
} from "../assets/classes/classes";

export function handleCharacterIcon(className) {
  switch (className) {
    case characterClasses.BARBARIAN:
      return <Barbarian />;
    case characterClasses.BARD:
      return <Bard />;
    case characterClasses.CLERIC:
      return <Cleric />;
    case characterClasses.DRUID:
      return <Druid />;
    case characterClasses.FIGHTER:
      return <Fighter />;
    case characterClasses.MONK:
      return <Monk />;
    case characterClasses.PALADIN:
      return <Paladin />;
    case characterClasses.RANGER:
      return <Ranger />;
    case characterClasses.ROGUE:
      return <Rogue />;
    case characterClasses.SORCERER:
      return <Sorcerer />;
    case characterClasses.WARLOCK:
      return <Warlock />;
    case characterClasses.WIZARD:
      return <Wizard />;
    case characterClasses.MONSTER:
      return <Monster />;
    default:
      return null;
  }
}
