import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import ActionSheet from 'react-native-action-sheet'
import {
  getAuthVisible,
  getCurrentUser,
  setCurrentUser,
} from '../../ducks/users'
import ListWrapper from './ListWrapper'
import AppBar from './AppBar'

class AppList extends Component {
  render() {
    const { navigation, authVisible, currentUser } = this.props

    if (authVisible) {
      navigation.navigate({ routeName: 'Login' })
    }

    return <ListWrapper userLoading={!currentUser} navigation={navigation} />
  }
}

const mapStateToProps = (state) => ({
  authVisible: getAuthVisible(state),
  currentUser: getCurrentUser(state),
})

const ConnectedAppList = connect(mapStateToProps)(AppList)

export default class AppListWrapper extends Component {
  menuButtonCB = () => {
    const { navigation } = this.props

    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Logout'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      async (index) => {
        if (index === 1) {
          // Logout
          await AsyncStorage.removeItem('protonSession')
          setCurrentUser(null)
          navigation.navigate({ routeName: 'Login' })
        }
      }
    )
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <AppBar {...this.props} menuButtonCB={this.menuButtonCB} />
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
      height: 0,
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
    height: 24,
  },
})
