import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppState } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { reducer as formReducer } from 'redux-form'
import 'es6-symbol/implement'

import * as reducers from './ducks'
import App from './components/App'
import { connectSocket } from './utils/io'
import { register } from './utils/notifications'
//import firebase from './utils/firebase'

const store = createStore(combineReducers({
  ...reducers,
  form: formReducer
}))

connectSocket(store)

class Wrapper extends Component {
  static childContextTypes = {
    getDeviceId: PropTypes.func,
  }

  state = { deviceId: null }

  getChildContext() {
    return {
      getDeviceId: () => this.state.deviceId
    }
  }

  handleChangeAppState = () => {
    let currentState = AppState.currentState
    let navigation = this._navigation

    if (!navigation) { return }

    if (currentState === 'background') {
      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
        ],
      }))
    }
  }

  handleRegister = token => {
    this.setState({ deviceId: token })
  }

  handleNotification = (appId, route) => {
    let { deviceId } = this.state

    window.setTimeout(() => {
      let navigation = this._navigation

      if (!navigation) { return }

      navigation.dispatch(StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({
            routeName: 'Viewer',
            params: { appId, deviceId, initialRoute: route }
          })
        ],
      }))
    }, 100)
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleChangeAppState)

    register({
      onRegister: this.handleRegister,
      onNotification: this.handleNotification,
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleChangeAppState)
  }


  navRef = el => {
    this._navigation = el
  }

  render() {
    return (
      <App ref={this.navRef} />
    )
  }
}

export default () => (
  <Provider store={store}>
    <ActionSheetProvider>
      <Wrapper />
    </ActionSheetProvider>
  </Provider>
)
