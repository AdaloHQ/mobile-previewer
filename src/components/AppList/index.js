import React, { Component } from 'react'

import {
  View,
  Image,
  StyleSheet,
  Platform,
  AppState,
} from 'react-native'

import { connect } from 'react-redux'
import { createStackNavigator, Header, StackActions, NavigationActions } from 'react-navigation'

import { getAuthVisible, getCurrentUser } from '../../ducks/users'
import ListWrapper from './ListWrapper'
import MenuButton from './MenuButton'
import LogoImage from './images/foundry-logo-text.png'

class AppList extends Component {
  handleChangeAppState = () => {
    let currentState = AppState.currentState
    let { navigation } = this.props

    if (currentState === 'active' && this._prevAppState === 'background') {
      navigation.dispatch(StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Viewer', params: { appId: 'd309389b-b1e7-4fc9-86cf-b36458c8439b' } })
        ],
      }))
    } else {
      this._prevAppState = currentState
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleChangeAppState)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleChangeAppState)
  }

  render() {
    let { navigation, authVisible, currentUser } = this.props

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
  currentUser: getCurrentUser(state)
})

const ConnectedAppList = connect(mapStateToProps)(AppList)

class WrappedHeader extends Component {
  render() {
    return (
      <View style={styles.headerWrapper}>
        <Header {...this.props} />
        <View style={styles.headerStripe}>
          <View style={{ flex: 1, backgroundColor: '#a82058' }} />
          <View style={{ flex: 1, backgroundColor: '#ef4c30' }} />
          <View style={{ flex: 1, backgroundColor: '#ffc00e' }} />
          <View style={{ flex: 1, backgroundColor: '#a1cd46' }} />
          <View style={{ flex: 1, backgroundColor: '#00a898' }} />
          <View style={{ flex: 1, backgroundColor: '#43437a' }} />
        </View>
      </View>
    )
  }
}

export default createStackNavigator(
  {
    Main: {
      screen: ConnectedAppList,
      navigationOptions: ({ navigation }) => ({
        title: 'Foundry',
        headerTitle: Platform.OS === 'ios'
          ? <Image source={LogoImage} />
          : 'Foundry',
        header: props => <WrappedHeader {...props} />,
        headerStyle: styles.header,
        headerLeft:  <MenuButton navigation={navigation} />,
      })
    }
  }
)

const styles = StyleSheet.create({
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
    height: 56,
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

