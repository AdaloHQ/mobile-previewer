import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ObjectRenderer from './ObjectRenderer'

export default class Screen extends Component {
  render() {
    let { component, offsetX } = this.props

    let { width, height, objects } = component

    return (
      <View style={[styles.screen, { width, height }]}>
        {objects.map(obj => (
          <ObjectRenderer
            key={obj.id}
            object={obj}
            component={component}
          />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
  }
})
