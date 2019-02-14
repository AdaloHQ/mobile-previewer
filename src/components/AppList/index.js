import React, { Component } from 'react'

import {
  View,
  Image,
  StyleSheet,
  Platform,
  AppState,
  PushNotificationIOS,
} from 'react-native'

import { connect } from 'react-redux'
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import PushNotification from 'react-native-push-notification'

import { getAuthVisible, getCurrentUser } from '../../ducks/users'
import ListWrapper from './ListWrapper'
import MenuButton from './MenuButton'
import LogoImage from './images/foundry-logo-text.png'
import AppBar from './AppBar'

class AppList extends Component {
  state = { deviceId: null }

  handleChangeAppState = () => {
    let currentState = AppState.currentState
    let { navigation } = this.props

    if (currentState === 'active' && this._prevAppState === 'background') {
      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
        ],
      }))
    } else {
      this._prevAppState = currentState
    }
  }

  handleNotification = notification => {
    let { navigation } = this.props
    let { deviceId } = this.state
    let { userInteraction } = notification
    let { appId, route } = notification.data

    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }

    if (!userInteraction || !appId || !route || !route.target) { return }

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
  }

  handleRegister = device => {
    this.setState({ deviceId: device.token })
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleChangeAppState)

    PushNotification.configure({
      onRegister: this.handleRegister,
      onNotification: this.handleNotification,
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleChangeAppState)
  }

  render() {
    let { navigation, authVisible, currentUser } = this.props
    let { deviceId } = this.state

    if (authVisible && !global.authIsMounted) {
      navigation.navigate('Login')
    }

    return (
      <ListWrapper
        userLoading={!currentUser}
        navigation={navigation}
        deviceId={deviceId}
      />
    )
  }
}

const mapStateToProps = state => ({
  authVisible: getAuthVisible(state),
  currentUser: getCurrentUser(state)
})

const ConnectedAppList = connect(mapStateToProps)(AppList)

export default class AppListWrapper extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <AppBar {...this.props} />
        <ConnectedAppList {...this.props} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    borderBottomWidth: 0,
    height: Platform.OS === 'ios' ? 56 : undefined,
  },
  headerIOS: {
    height: 50,
  },
  headerStripe: {
    height: 4,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  headerWrapper: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowRadius: 6,
    shadowOffset: { height: 3 },
    shadowOpacity: 1,
  },
  logo: {
    width: 90,
    height: 24
  }
})

