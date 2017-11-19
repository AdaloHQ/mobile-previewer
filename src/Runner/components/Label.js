import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ActionWrapper from './ActionWrapper'

export default class Label extends Component {
  render() {
    let { object, component, bindingData } = this.props

    let binding = component.dataBindings[object.id]

    let text = object.text

    if (binding) {
      if (bindingData[object.id]) {
        text = bindingData[object.id]
      } else {
        text = ""
      }
    }

    let wrapperStyles = {
      position: 'absolute',
      left: object.x,
      top: object.y,
      backgroundColor: 'transparent'
    }

    let textStyles = {
      color: object.color,
      fontSize: object.fontSize
    }

    if (!object.autoWidth) {
      wrapperStyles.width = object.width
      textStyles.textAlign = object.textAlignment
    }

    return (
      <View style={wrapperStyles}>
        <ActionWrapper action={component.links[object.id]}>
          <Text style={textStyles}>
            {text}
          </Text>
        </ActionWrapper>
      </View>
    )
  }
}

