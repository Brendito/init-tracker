export const savedActionTypes = {
   CREATE_CAMPAIGN: 'CREATE_CAMPAIGN',
   LOAD_CAMPAIGN: 'LOAD_CAMPAIGN',
   SAVE_CAMPAIGN: 'SAVE_CAMPAIGN',
   SAVE_NPC: 'SAVE_NPC',
   DELETE_NPC: 'DELETE_NPC'
}

// TODO: Refactor to action creator
export const saveCampaign = campaign => ({
   type: savedActionTypes.SAVE_CAMPAIGN,
   campaign,
})

export const createCampaign = campaign => ({
   type: savedActionTypes.CREATE_CAMPAIGN,
   campaign,
})

export const loadCampaign = campaign => ({
   type: savedActionTypes.LOAD_CAMPAIGN,
   campaign,
})

export const saveNPC = npc => ({
   type: savedActionTypes.SAVE_NPC,
   npc,
})

export const deleteNPC = id => ({
   type: savedActionTypes.DELETE_NPC,
   id,
})
