import React, { Component } from 'react'
import { View, StyleSheet, AppState, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import ActionSheet from 'react-native-action-sheet'
import Runner from '@protonapp/proton-runner'
import { getApp, requestApp } from '../../ducks/apps'
import AppBar from '../AppList/AppBar'

import libraries from '../../../libraries'

export const baseURL = 'https://database-red.adalo.com'
export const assetsBaseURL =
  'https://s3-us-west-1.amazonaws.com/apto-resources-dev'
export const fileUploadsBaseURL =
  'https://proton-uploads-production.s3.amazonaws.com'
export const imageUploadsBaseURL = 'https://adalo-uploads.imgix.net'
export const notificationsURL = 'https://notifications.adalo.com'

class Viewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
    }
  }

  handleClose = () => {
    const { navigation } = this.props

    navigation.dispatch(NavigationActions.back())
  }

  menuButtonCB = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Reload', 'Exit'],
        cancelButtonIndex: 0,
      },
      async (index) => {
        const { route, requestApp } = this.props

        if (index === 1) {
          // Reload
          requestApp(route.params.appId)
        } else if (index === 2) {
          // Exit
          this.handleClose()
        }
      }
    )
  }

  handleChangeAppState = () => {
    const { currentState } = AppState
    const { navigation } = this.props

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
    return this.state.images[filename] || `${assetsBaseURL}/${filename}`
  }

  componentDidMount() {
    const { route, requestApp } = this.props
    requestApp(route.params.appId)

    AppState.addEventListener('change', this.handleChangeAppState)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleChangeAppState)
  }

  render() {
    const { app, navigation, route } = this.props
    const { deviceId, initialRoute } = route.params
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
  app: getApp(state, ownProps.route.params.appId),
})

export default connect(mapStateToProps, { requestApp })(Viewer)
