import * as actionTypes from '../constants/actionTypes'

export const saveCampaign = campaign => ({
   type: actionTypes.SAVE_CAMPAIGN,
   campaign,
})

export const createCampaign = campaign => ({
   type: actionTypes.CREATE_CAMPAIGN,
   campaign,
})

export const loadCampaign = campaign => ({
   type: actionTypes.LOAD_CAMPAIGN,
   campaign,
})

export const saveNPC = npc => ({
   type: actionTypes.SAVE_NPC,
   npc,
})

export const deleteNPC = id => ({
   type: actionTypes.DELETE_NPC,
   id,
})
