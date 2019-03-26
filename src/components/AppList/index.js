import React, { Component } from 'react'

import {
  View,
  Image,
  StyleSheet,
  Platform,
} from 'react-native'

import { connect } from 'react-redux'

import { getAuthVisible, getCurrentUser } from '../../ducks/users'
import ListWrapper from './ListWrapper'
import MenuButton from './MenuButton'
import LogoImage from './images/foundry-logo-text.png'
import AppBar from './AppBar'

class AppList extends Component {
  render() {
    let { navigation, authVisible, currentUser, deviceId } = this.props

    if (authVisible && !global.authIsMounted) {
      navigation.navigate('Login')
    }

    return (
      <ListWrapper
        userLoading={!currentUser}
        navigation={navigation}
      />
    )
  }
}

const mapStateToProps = state => ({
  authVisible: getAuthVisible(state),
  currentUser: getCurrentUser(state),
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

