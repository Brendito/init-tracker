import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadState, saveState } from './utils/localStorage'
import throttle from 'lodash/throttle'
import watch from 'redux-watch'

const persistedState = loadState()

const store = createStore(
   rootReducer,
   persistedState,
   typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Listen for changes in loaded store and send save Action to save campaign
let w = watch(store.getState, 'loaded')
store.subscribe(
   w(() => {
      const storeState = store.getState()
      const campaign = storeState.loaded.id ? storeState.loaded : null
      store.dispatch({
         type: 'SAVE_CAMPAIGN',
         campaign,
      })
   })
)

store.subscribe(
   throttle(() => {
      saveState(store.getState())
   }, 1000)
)

ReactDOM.render(
   <Provider store={store}>
      <Router>
         <App />
      </Router>
   </Provider>,
   document.getElementById('root')
)

serviceWorker.unregister()
