import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class Group extends Component {
  render() {
    let { children } = this.props

    return (
      <View style={styles.group} pointerEvents="box-none">
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    left: 0,
    top: 0
  }
})
