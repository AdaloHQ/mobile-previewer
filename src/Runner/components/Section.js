import React, { Component } from 'react'
import { View } from 'react-native'

import ActionWrapper from './ActionWrapper'

export default class Section extends Component {
  render() {
    let { object, component } = this.props

    let styles = {
      position: 'absolute',
      left: object.x,
      top: object.y,
      width: object.width,
      height: object.height,
      opacity: object.opacity,
      borderRadius: object.borderRadius,
      backgroundColor: object.backgroundColor
    }

    return (
      <ActionWrapper action={component.links[object.id]}>
        <View style={styles} />
      </ActionWrapper>
    )
  }
}

