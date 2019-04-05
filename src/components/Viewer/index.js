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
} from 'react-native'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ShakeEvent from 'react-native-shake-event'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import Runner from '@protonapp/proton-runner'
import * as MaterialComponents from '@protonapp/material-components'
import * as StripeComponents from '@protonapp/stripe-component'

import { getApp, requestApp } from '../../ducks/apps'
import Modal from './Modal'

export const baseURL = 'https://proton-database.herokuapp.com'
export const assetsBaseURL = 'https://s3-us-west-1.amazonaws.com/apto-resources-dev'
export const uploadsBaseURL = 'https://foundry-uploads.imgix.net'
export const notificationsURL = 'https://proton-notifications.herokuapp.com'

class Viewer extends Component {
  menuOpen = false

  state = {
    modalOpacity: new Animated.Value(0),
    modalVisible: false,
  }

  handleClose = () => {
    let { navigation } = this.props

    navigation.dispatch(NavigationActions.back())
  }

  handleShake = () => {
    if (this.menuOpen) { return }
    this.menuOpen = true

    let { navigation, requestApp } = this.props

    this.props.showActionSheetWithOptions({
      options: ['Cancel', 'Reload', 'Exit'],
      cancelButtonIndex: 0
    }, index => {
      this.menuOpen = false

      if (index === 1) {
        // Reload
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
      //navigation.dispatch(NavigationActions.back())
    } else {
      this._prevAppState = currentState
    }
  }

  getLibraries = () => {
    // Hardcoded for now...
    return {
      '@protonapp/material-components': MaterialComponents,
      '@protonapp/stripe-component': StripeComponents,
    }
  }

  showShakeModal = async () => {
    let { modalOpacity } = this.state

    let modalDismissed = await AsyncStorage.getItem('shakeModalDismissed')

    if (modalDismissed === 'true') { return }

    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 200,
      delay: 400,
    }).start()

    this.setState({ modalVisible: true })
  }

  hideShakeModal = async () => {
    let { modalOpacity } = this.state

    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 200,
      delay: 50,
    }).start()

    this.setState({ modalVisible: false })
  }

  handleNeverAgain = async () => {
    this.hideShakeModal()

    await AsyncStorage.setItem('shakeModalDismissed', 'true')
  }

  componentDidMount() {
    let { navigation, requestApp } = this.props
    requestApp(navigation.state.params.appId)

    ShakeEvent.addEventListener('shake', this.handleShake)
    AppState.addEventListener('change', this.handleChangeAppState)

    this.showShakeModal()
  }

  componentWillUnmount() {
    ShakeEvent.removeEventListener('shake')
    AppState.removeEventListener('change', this.handleChangeAppState)
  }

  render() {
    let { app, navigation } = this.props
    let { deviceId, initialRoute } = navigation.state.params
    let { modalOpacity, modalVisible } = this.state
    let modalStyles = { opacity: modalOpacity }

    return (
      <View style={styles.view}>
        <Runner
          previewer
          skipNotifications
          app={app}
          baseURL={baseURL}
          assetsBaseURL={assetsBaseURL}
          uploadsBaseURL={uploadsBaseURL}
          notificationsURL={notificationsURL}
          libraries={this.getLibraries()}
          deviceId={deviceId}
          initialRoute={initialRoute}
        />
        <Animated.View
          style={[styles.shakeModal, modalStyles]}
          pointerEvents={modalVisible ? 'auto' : 'none'}
        >
          <Modal
            onHide={this.hideShakeModal}
            onNeverAgain={this.handleNeverAgain}
          />
        </Animated.View>
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
  app: getApp(state, ownProps.navigation.state.params.appId)
})

export default connectActionSheet(connect(
  mapStateToProps,
  { requestApp }
)(Viewer))
