import * as actionTypes from '../constants/actionTypes'

export const clearCampaign = () => ({
   type: actionTypes.CLEAR_CAMPAIGN,
})

export const savePlayer = player => ({
   type: actionTypes.SAVE_PLAYER,
   player,
})

export const deletePlayer = id => ({
   type: actionTypes.DELETE_PLAYER,
   id,
})

export const createEncounter = encounter => ({
   type: actionTypes.CREATE_ENCOUNTER,
   encounter,
})

export const deleteEncounter = id => ({
   type: actionTypes.DELETE_ENCOUNTER,
   id,
})

export const saveEncounter = encounter => ({
   type: actionTypes.SAVE_ENCOUNTER,
   encounter,
})
