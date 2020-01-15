import { combineReducers } from "redux";

import { loadedReducer } from "./loadedReducer";
import { savedReducer } from "./savedReducer";
import { trackerReducer } from "./trackerReducer";

export default combineReducers({
  saved: savedReducer,
  loaded: loadedReducer,
  tracker: trackerReducer
});
