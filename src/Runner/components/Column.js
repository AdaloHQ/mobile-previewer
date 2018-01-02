import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class Column extends Component {
  render() {
    let { children, object: { layout } } = this.props

    return (
      <View style={[styles.wrapper, layout]}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column'
  }
})
