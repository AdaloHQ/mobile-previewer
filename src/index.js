import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import * as reducers from './ducks'
import App from './components/App'
import { connectSocket } from './utils/io'

const store = createStore(combineReducers(reducers))

connectSocket(store)

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
