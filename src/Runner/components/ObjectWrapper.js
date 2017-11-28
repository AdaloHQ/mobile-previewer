import React, { Component } from 'react'
import { View } from 'react-native'

export default class ObjectWrapper extends Component {
  render() {
    let { object, style, children } = this.props

    let wrapperStyles = {
      position: 'absolute',
      opacity: object.opacity || 1,
      left: object.x,
      top: object.y,
      backgroundColor: 'transparent'
    }

    return (
      <View style={[wrapperStyles, style]}>
        {children}
      </View>
    )
  }
}
