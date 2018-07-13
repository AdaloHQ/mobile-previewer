import config from 'react-native-config'

import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AppState
} from 'react-native'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ShakeEvent from 'react-native-shake-event'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import { getApp, requestApp } from '../../ducks/apps'
import Runner from '@protonapp/proton-runner'

export const baseURL = 'https://proton-database.herokuapp.com'
export const assetsBaseURL = 'https://s3-us-west-1.amazonaws.com/apto-resources-dev'
export const uploadsBaseURL = 'https://s3.amazonaws.com/proton-uploads-production'

class Viewer extends Component {
  menuOpen = false

  handleClose = () => {
    let { navigation } = this.props

    navigation.dispatch(NavigationActions.back())
  }

  handleShake = () => {
    if (this.menuOpen) { return }
    this.menuOpen = true

    let { navigation, requestApp } = this.props

    this.props.showActionSheetWithOptions({
      options: ['Cancel', 'Reload', 'All Apps'],
      cancelButtonIndex: 0
    }, index => {
      this.menuOpen = false

      if (index === 1) {
        // Reload
        console.log("CLICKED RELOAD!")
        requestApp(navigation.state.params.appId)
      } else if (index === 2) {
        // Exit
        this.handleClose()
      }
    })
  }

  handleChangeAppState = () => {
    let currentState = AppState.currentState
    let { navigation } = this.props

    if (currentState === 'active' && this._prevAppState === 'background') {
      navigation.dispatch(NavigationActions.back())
    } else {
      this._prevAppState = currentState
    }
  }

  componentWillMount() {
    let { navigation, requestApp } = this.props
    requestApp(navigation.state.params.appId)

    ShakeEvent.addEventListener('shake', this.handleShake)
    AppState.addEventListener('change', this.handleChangeAppState)
  }

  componentWillUnmount() {
    ShakeEvent.removeEventListener('shake')
    AppState.removeEventListener('change', this.handleChangeAppState)
  }

  render() {
    let { app } = this.props

    //let baseURL = config.REACT_APP_DATABASE_URL

    return (
      <View style={styles.view}>
        <Runner
          app={app}
          baseURL={baseURL}
          assetsBaseURL={assetsBaseURL}
          uploadsBaseURL={uploadsBaseURL}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
})

const mapStateToProps = (state, ownProps) => ({
  app: getApp(state, ownProps.navigation.state.params.appId)
})

export default connectActionSheet(connect(
  mapStateToProps,
  { requestApp }
)(Viewer))
