import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import { getApps, getLoading, requestApps } from '../../ducks/apps'
import Loader from '../Shared/Loader'
import ListView from './List'

class ListWrapper extends Component {
  static contextTypes = {
    getDeviceId: PropTypes.func,
  }

  handlePress = appId => {
    let { navigation } = this.props
    let deviceId = this.context.getDeviceId()

    navigation.navigate('Viewer', { appId, deviceId })
  }

  shouldComponentUpdate(newProps) {
    let { userLoading } = this.props

    if (!newProps.userLoading && userLoading) {
      this.props.requestApps()
    }

    return true
  }

  render() {
    let { apps, loading, userLoading, requestApps } = this.props

    return (
      <View style={styles.body}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
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
