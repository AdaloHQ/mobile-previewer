import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import ActionWrapper from './ActionWrapper'

export default class Group extends Component {
  render() {
    let { object, children, component } = this.props

    return (
      <ActionWrapper action={component.links[object.id]}>
        <View style={styles.group} pointerEvents="box-none">
          {children}
        </View>
      </ActionWrapper>
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
