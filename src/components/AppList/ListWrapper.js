import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import { getApps, getLoading, requestApps } from '../../ducks/apps'
import Loader from '../Shared/Loader'
import ListView from './List'

class ListWrapper extends Component {
  handlePress = appId => {
    let { navigation } = this.props

    navigation.navigate('Viewer', { appId })
  }

  shouldComponentUpdate = newProps => {
    let { ioReady, userLoading } = this.props

    if (newProps.ioReady && !newProps.userLoading &&
        (!ioReady || userLoading)) {

      this.props.requestApps()
    }

    return true
  }

  render() {
    let { apps, loading, userLoading, requestApps } = this.props

    return (
      <View style={styles.body}>
        <StatusBar barStyle="dark-content" />
        <ListView
          apps={apps}
          loading={loading || userLoading}
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
    backgroundColor: '#fff',
  },
})

const mapStateToProps = state => ({
  apps: getApps(state),
  loading: getLoading(state)
})

export default ConnectedListWrapper = connect(
  mapStateToProps,
  { requestApps }
)(ListWrapper)
