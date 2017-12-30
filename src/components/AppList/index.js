import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import { getApps, getLoading, requestApps } from '../../ducks/apps'
import Loader from '../Shared/Loader'
import ListView from './List'
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
    let { apps, loading, requestApps } = this.props

    return (
      <View style={styles.body}>
        <StatusBar barStyle="light-content" />
        <ListView
          apps={apps}
          loading={loading}
          onPressItem={this.handlePress}
          onRefresh={requestApps}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#00009e',
  },
  header: {
    backgroundColor: '#0000ff',
  },
  headerTitle: {
    color: '#fff'
  }
})

const mapStateToProps = state => ({
  apps: getApps(state),
  loading: getLoading(state)
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
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        //headerLeft: <LogoutButton />
      }
    }
  }
)
