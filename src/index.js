import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { StackActions, NavigationActions } from 'react-navigation'
import 'es6-symbol/implement'

import * as reducers from './ducks'
import App from './components/App'
import { connectSocket } from './utils/io'
import { register } from './utils/notifications'

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer,
  })
)

connectSocket(store)

class Wrapper extends Component {
  static childContextTypes = {
    getDeviceId: PropTypes.func,
  }

  state = { deviceId: null }

  getChildContext() {
    return {
      getDeviceId: () => this.state.deviceId,
    }
  }

  handleRegister = (token) => {
    this.setState({ deviceId: token })
  }

  handleNotification = (appId, route) => {
    let { deviceId } = this.state

    window.setTimeout(() => {
      let navigation = this._navigation

      if (!navigation) {
        return
      }

      navigation.dispatch(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({
              routeName: 'Viewer',
              params: { appId, deviceId, initialRoute: route },
            }),
          ],
        })
      )
    }, 100)
  }

  componentDidMount() {
    register({
      onRegister: this.handleRegister,
      onNotification: this.handleNotification,
    })
  }

  navRef = (el) => {
    this._navigation = el
  }

  render() {
    return <App ref={this.navRef} />
  }
}

export default () => (
  <Provider store={store}>
    <Wrapper />
  </Provider>
)
