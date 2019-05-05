import * as types from '../constants/actionTypes'

export const loadEncounter = encounter => ({
   type: types.LOAD_ENCOUNTER,
   encounter,
})

export const addToTracker = characters => ({
   type: types.ADD_TO_TRACKER,
   characters
})

