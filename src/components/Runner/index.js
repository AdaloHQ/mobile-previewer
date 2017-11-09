import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Navigator from './Navigator'

export default class Runner extends Component {
  render() {
    let { app } = this.props
    let { launchComponentId, components } = app
    let launchComponent = components[launchComponentId]

    return (
      <View style={styles.wrapper}>
        <Navigator app={app} initialComponentId={launchComponentId} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eee'
  }
})
