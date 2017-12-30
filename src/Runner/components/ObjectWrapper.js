import React, { Component } from 'react'
import { View } from 'react-native'

export default class ObjectWrapper extends Component {
  render() {
    let { object, style, children } = this.props

    let { attributes, layout } = object

    let wrapperStyles = {
      ...layout,
      opacity: attributes.opacity || 1,
      backgroundColor: 'transparent'
    }

    return (
      <View style={[wrapperStyles, style]}>
        {children}
      </View>
    )
  }
}
