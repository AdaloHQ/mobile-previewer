import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class Wrapper extends Component {
  render() {
    let { children, object: { layout } } = this.props

    return (
      <View style={[styles.wrapper, layout]} pointerEvents="box-none">
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
})
