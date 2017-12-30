import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { bindingTypes } from 'apto-constants'

import { relativeDate } from '../utils/dates'
import { bindingValue } from '../utils/dependencies'
import ActionWrapper from './ActionWrapper'
import ObjectWrapper from './ObjectWrapper'

export default class Label extends Component {
  render() {
    let { object, component, bindingData, parentBindingData } = this.props

    let binding = component.dataBindings[object.id]
    let { attributes } = object

    let text = attributes.text

    if (binding) {
      let bindingVal

      if (object.id in bindingData) {
        bindingVal = bindingData[object.id] || ''
      } else {
        bindingVal = bindingValue(object.id, binding, bindingData, parentBindingData)
      }

      if (bindingVal !== undefined) {
        if (binding.bindingType === bindingTypes.SET_TEXT) {
          text = bindingVal
        } else if (binding.bindingType === bindingTypes.DATE) {
          text = relativeDate(bindingVal)
        }
      }
    }

    let wrapperStyles = {
      minWidth: attributes.width
    }

    let textStyles = {
      color: attributes.color,
      fontSize: attributes.fontSize,
      textAlign: attributes.textAlignment
    }

    return (
      <ObjectWrapper object={object} style={wrapperStyles}>
        <ActionWrapper component={component} object={object}>
          <Text style={textStyles} numberOfLines={1}>
            {text}
          </Text>
        </ActionWrapper>
      </ObjectWrapper>
    )
  }
}

