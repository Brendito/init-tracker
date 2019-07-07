import { savedReducer } from './savedReducer'
import { loadedReducer } from './loadedReducer'
import { trackerReducer } from './trackerReducer'
import { combineReducers } from 'redux'

export default combineReducers({
   saved: savedReducer,
   loaded: loadedReducer,
   tracker: trackerReducer,
})
