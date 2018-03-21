import React, { Component } from 'react'
import { View, Image, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import { ioReady } from '../../utils/io'
import { getAuthVisible, getCurrentUser } from '../../ducks/users'
import ListWrapper from './ListWrapper'
import MenuButton from './MenuButton'
import LogoImage from './images/proton-logo.png'

class AppList extends Component {
  render() {
    let { navigation, authVisible, currentUser } = this.props

    if (ioReady() && authVisible && !global.authIsMounted) {
      navigation.navigate('Login')
    }

    return (
      <ListWrapper
        ioReady={ioReady()}
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    borderBottomWidth: 0
  },
  logo: {
    width: 90,
    height: 24
  }
})

export default StackNavigator(
  {
    Main: {
      screen: ConnectedAppList,
      navigationOptions: ({ navigation }) => ({
        title: (
          Platform.OS === 'ios' ? <Image source={LogoImage} /> : 'Proton'
        ),
        headerStyle: styles.header,
        headerLeft:  <MenuButton navigation={navigation} />,
      })
    }
  }
)

