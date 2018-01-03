import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class RowSpacer extends Component {
  render() {
    let { object: { layout } } = this.props

    return (
      <View style={[styles.wrapper, layout]} />
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  }
})
