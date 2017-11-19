import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import { getApps, requestApps } from '../../ducks/apps'
import Loader from '../Shared/Loader'
import ListView from './List'
import RefreshButton from './RefreshButton'
import LogoutButton from './LogoutButton'

class ListWrapper extends Component {
  componentWillMount() {
    this.props.requestApps()
  }

  handlePress = appId => {
    let { navigation } = this.props

    navigation.navigate('Viewer', { appId })
  }

  render() {
    let { apps } = this.props

    if (apps.length === 0) {
      return (
        <View style={styles.body}>
          <Loader />
        </View>
      )
    }

    return (
      <View style={styles.body}>
        <ListView apps={apps} onPressItem={this.handlePress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#eeeeee',
  }
})

const mapStateToProps = state => ({
  apps: getApps(state)
})

const ConnectedListWrapper = connect(
  mapStateToProps,
  { requestApps }
)(ListWrapper)

export default StackNavigator(
  {
    Main: {
      screen: ConnectedListWrapper,
      navigationOptions: {
        title: 'My Apps',
        headerRight: <RefreshButton />,
        headerLeft: <LogoutButton />
      }
    }
  }
)
