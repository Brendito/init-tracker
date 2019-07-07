export const loadedActionTypes = {
   SAVE_PLAYER: 'SAVE_PLAYER',
   DELETE_PLAYER: 'DELETE_PLAYER',
   CLEAR_CAMPAIGN: 'CLEAR_CAMPAIGN',
   SAVE_ENCOUNTER: 'SAVE_ENCOUNTER',
   CREATE_ENCOUNTER: 'CREATE_ENCOUNTER',
   DELETE_ENCOUNTER: 'DELETE_ENCOUNTER',
}

// TODO: Refactor to action creator
export const clearCampaign = () => ({
   type: loadedActionTypes.CLEAR_CAMPAIGN,
})

export const savePlayer = player => ({
   type: loadedActionTypes.SAVE_PLAYER,
   player,
})

export const deletePlayer = id => ({
   type: loadedActionTypes.DELETE_PLAYER,
   id,
})

export const createEncounter = encounter => ({
   type: loadedActionTypes.CREATE_ENCOUNTER,
   encounter,
})

export const deleteEncounter = id => ({
   type: loadedActionTypes.DELETE_ENCOUNTER,
   id,
})

export const saveEncounter = encounter => ({
   type: loadedActionTypes.SAVE_ENCOUNTER,
   encounter,
})
