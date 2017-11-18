import React, { Component } from 'react'
import { View } from 'react-native'

export default class Section extends Component {
  render() {
    let { object } = this.props

    let styles = {
      position: 'absolute',
      left: object.x,
      top: object.y,
      width: object.width,
      height: object.height,
      borderRadius: object.borderRadius,
      backgroundColor: object.backgroundColor
    }

    return (
      <View style={styles} />
    )
  }
}

