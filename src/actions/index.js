import { loadedActionTypes } from './loadedActions'
import { savedActionTypes } from './savedActions'
import { trackerActionTypes } from './trackerActions'

const actionTypes = {
   ...loadedActionTypes,
   ...savedActionTypes,
   ...trackerActionTypes,
}

export default actionTypes
