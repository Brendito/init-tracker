import React from 'react'
import * as types from '../constants/characterClasses'
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
   Wizard,
} from '../assets/classes/classes'

export function handleCharacterIcon(className) {
   switch (className) {
      case types.BARBARIAN:
         return <Barbarian />
      case types.BARD:
         return <Bard />
      case types.CLERIC:
         return <Cleric />
      case types.DRUID:
         return <Druid />
      case types.FIGHTER:
         return <Fighter />
      case types.MONK:
         return <Monk />
      case types.PALADIN:
         return <Paladin />
      case types.RANGER:
         return <Ranger />
      case types.ROGUE:
         return <Rogue />
      case types.SORCERER:
         return <Sorcerer />
      case types.WARLOCK:
         return <Warlock />
      case types.WIZARD:
         return <Wizard />
      case types.MONSTER:
         return <Monster />
      default:
         return null
   }
}
