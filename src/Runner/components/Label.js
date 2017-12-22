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

    let text = object.text

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

