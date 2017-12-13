import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import {
  getAuthenticated,
  getAuthScreenVisible,
  restartSession
} from '../ducks/auth'

import Navigator from './Navigator'
import AuthScreen from './AuthScreen'
import Loading from './Loading'

class Runner extends Component {
  componentWillMount() {
    // Attempt to grab the user's session token from asyncStorage
    let { app } = this.props
    let id = app.datasources && Object.keys(app.datasources)[0]

    this.props.restartSession(id)
  }

  render() {
    let { app, authenticated, authScreenVisible } = this.props
    let { launchComponentId, components } = app
    let launchComponent = components[launchComponentId]

    authenticated = true
    authScreenVisible = false

    return (
      <View style={styles.wrapper}>
        {authenticated
          ? <Navigator app={app} initialComponentId={launchComponentId} />
          : <Loading />}
        {authScreenVisible
          ? <AuthScreen app={app} />
          : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eee'
  }
})

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state),
  authScreenVisible: getAuthScreenVisible(state)
})

export default connect(mapStateToProps, { restartSession })(Runner)
