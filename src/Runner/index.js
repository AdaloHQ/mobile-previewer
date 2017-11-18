import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './ducks'
import Runner from './components'

export default class RunnerWrapper extends Component {
  constructor(props) {
    super(props)

    // setup redux store
    this.store = createStore(
      combineReducers({ ...reducers, form: formReducer }),
      applyMiddleware(thunkMiddleware)
    )
  }

  render() {
    let { app } = this.props

    return (
      <Provider store={this.store}>
        <Runner app={app} />
      </Provider>
    )
  }
}
