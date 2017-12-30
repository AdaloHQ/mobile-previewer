import React, { Component } from 'react'
import { View } from 'react-native'

import ActionWrapper from './ActionWrapper'

export default class Section extends Component {
  render() {
    let { object, component, children } = this.props

    let { attributes, layout } = object

    let styles = {
      ...layout,
      opacity: attributes.opacity,
      borderRadius: attributes.borderRadius,
      backgroundColor: attributes.backgroundColor
    }

    return (
      <ActionWrapper component={component} object={object}>
        <View style={styles}>
          {children}
        </View>
      </ActionWrapper>
    )
  }
}

