import throttle from "lodash/throttle";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import watch from "redux-watch";
import App from "./components/App/App";
import "./index.css";
import { State } from "./models";
import rootReducer from "./reducers/rootReducer";
import * as serviceWorker from "./serviceWorker";
import { loadState, saveState } from "./utils/localStorage";

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// Listen for changes in loaded store and send save Action to save campaign
let w = watch(store.getState, "loaded");
store.subscribe(
  w(() => {
    const storeState = store.getState() as State;
    const campaign = storeState.loaded.id ? storeState.loaded : null;
    store.dispatch({
      type: "SAVE_CAMPAIGN",
      campaign
    });
  })
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
