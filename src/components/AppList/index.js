import React, { Component } from 'react'
import { View, Image, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator, Header } from 'react-navigation'

import { ioReady } from '../../utils/io'
import { getAuthVisible, getCurrentUser } from '../../ducks/users'
import ListWrapper from './ListWrapper'
import MenuButton from './MenuButton'
import LogoImage from './images/foundry-logo-text.png'

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

export default StackNavigator(
  {
    Main: {
      screen: ConnectedAppList,
      navigationOptions: ({ navigation }) => ({
        title: (
          Platform.OS === 'ios' ? <Image source={LogoImage} /> : 'Foundry'
        ),
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
    borderBottomWidth: 0
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

