import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AppState,
  Animated,
  Easing,
  AsyncStorage,
  Platform,
} from 'react-native'

import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import RNShake from 'react-native-shake'
import ActionSheet from 'react-native-action-sheet'

import Runner from '@protonapp/proton-runner'

import { getApp, requestApp } from '../../ducks/apps'
import AppBar from '../AppList/AppBar'

export const baseURL = 'https://database-red.adalo.com'
export const assetsBaseURL =
  'https://s3-us-west-1.amazonaws.com/apto-resources-dev'
export const fileUploadsBaseURL =
  'https://proton-uploads-production.s3.amazonaws.com'
export const imageUploadsBaseURL = 'https://adalo-uploads.imgix.net'
export const notificationsURL = 'https://notifications.adalo.com'

import libraries from '../../../libraries'

class Viewer extends Component {
  handleClose = () => {
    let { navigation } = this.props

    navigation.dispatch(NavigationActions.back())
  }

  menuButtonCB = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Reload', 'Exit'],
        cancelButtonIndex: 0,
      },
      async (index) => {
        let { navigation, requestApp } = this.props

        if (index === 1) {
          // Reload
          requestApp(navigation.state.params.appId)
        } else if (index === 2) {
          // Exit
          this.handleClose()
        }
      }
    )
  }

  handleChangeAppState = () => {
    let currentState = AppState.currentState
    let { navigation } = this.props

    if (!navigation || Platform.OS === 'android') {
      return
    }

    if (currentState === 'background') {
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        })
      )
    }
  }

  getLibraries = () => libraries

  getAssetURL = (filename) => {
    return `${assetsBaseURL}/${filename}`
  }

  componentDidMount() {
    let { navigation, requestApp } = this.props
    requestApp(navigation.state.params.appId)

    AppState.addEventListener('change', this.handleChangeAppState)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleChangeAppState)
  }

  render() {
    let { app, navigation } = this.props
    let { deviceId, initialRoute } = navigation.state.params
    return (
      <View style={styles.view}>
        <AppBar navigation={navigation} menuButtonCB={this.menuButtonCB} />
        <Runner
          previewer
          skipNotifications
          app={app}
          baseURL={baseURL}
          getAssetURL={this.getAssetURL}
          fileUploadsBaseURL={fileUploadsBaseURL}
          imageUploadsBaseURL={imageUploadsBaseURL}
          notificationsURL={notificationsURL}
          libraries={this.getLibraries()}
          deviceId={deviceId}
          initialRoute={initialRoute}
          appVersion="latest"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  shakeModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = (state, ownProps) => ({
  app: getApp(state, ownProps.navigation.state.params.appId),
})

export default connect(mapStateToProps, { requestApp })(Viewer)
