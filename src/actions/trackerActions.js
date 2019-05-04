import * as types from '../constants/actionTypes'

export const loadEncounter = encounter => ({
   type: types.LOAD_ENCOUNTER,
   encounter,
})
