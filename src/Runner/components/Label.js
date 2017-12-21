import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { bindingValue } from '../utils/dependencies'
import ActionWrapper from './ActionWrapper'
import ObjectWrapper from './ObjectWrapper'

export default class Label extends Component {
  render() {
    let { object, component, bindingData, parentBindingData } = this.props

    let binding = component.dataBindings[object.id]

    let text = object.text

    if (binding) {
      if (object.id in bindingData) {
        text = bindingData[object.id] || ''
      } else {
        text = bindingValue(object.id, binding, bindingData, parentBindingData)
      }
    }

    let wrapperStyles = {}

    let textStyles = {
      color: object.color,
      fontSize: object.fontSize
    }

    textStyles.textAlign = object.textAlignment

    if (!object.autoWidth) {
      wrapperStyles.width = object.width
    } else {
      wrapperStyles.minWidth = object.width
    }

    return (
      <ObjectWrapper object={object} style={wrapperStyles}>
        <ActionWrapper component={component} object={object}>
          <Text style={textStyles}>
            {text}
          </Text>
        </ActionWrapper>
      </ObjectWrapper>
    )
  }
}

