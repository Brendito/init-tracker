export const trackerActionTypes = {
   ADD_TO_TRACKER: 'ADD_TO_TRACKER',
   REMOVE_FROM_TRACKER: 'REMOVE_FROM_TRACKER',
   LOAD_ENCOUNTER: 'LOAD_ENCOUNTER',
}

// TODO: Refactor to action creator
export const loadEncounter = encounter => ({
   type: trackerActionTypes.LOAD_ENCOUNTER,
   encounter,
})

export const addToTracker = characters => ({
   type: trackerActionTypes.ADD_TO_TRACKER,
   characters,
})
